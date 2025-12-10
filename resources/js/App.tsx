import { createSignal, createResource, type Component, For, Show, onMount, Switch, Match } from 'solid-js';
import axios from 'axios';
import Login from './Login';
import Register from './Register';

type Task = {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

const fetchTasks = async () => {
  const response = await axios.get<Task[]>('/api/tasks');
  return response.data;
};

// TaskItem component for individual task state management
const TaskItem: Component<{
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
  // We need a way to refresh the list, passing refetch down or updating local state would work.
  // For simplicity, we can reload or accept an onUpdate callback.
  // Let's assume onUpdate is passed for now, or we just rely on parent list reload if we had one.
  // Actually, simpler is to just call an API and then trigger a refresh.
  // Let's add onUpdate prop.
  onUpdate: (task: Task) => void;
}> = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(false);
  const [isEditing, setIsEditing] = createSignal(false);
  const [editTitle, setEditTitle] = createSignal(props.task.title);
  const [editDescription, setEditDescription] = createSignal(props.task.description || '');

  const handleSave = async () => {
    try {
      await axios.put(`/api/tasks/${props.task.id}`, {
        title: editTitle(),
        description: editDescription(),
        is_completed: props.task.is_completed // preserve completion status
      });
      setIsEditing(false);
      // Trigger parent update
      props.onUpdate({ ...props.task, title: editTitle(), description: editDescription() });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(props.task.title);
    setEditDescription(props.task.description || '');
  };

  return (
    <div class="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
      <Show when={!isEditing()} fallback={
        // Edit Mode
        <div class="flex flex-col gap-2">
          <input
            type="text"
            value={editTitle()}
            onInput={(e) => setEditTitle(e.currentTarget.value)}
            class="px-2 py-1 border rounded"
          />
          <textarea
            value={editDescription()}
            onInput={(e) => setEditDescription(e.currentTarget.value)}
            class="px-2 py-1 border rounded text-sm h-20 resize-none"
            placeholder="Description"
          />
          <div class="flex gap-2 justify-end">
            <button onClick={handleCancel} class="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            <button onClick={handleSave} class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Save</button>
          </div>
        </div>
      }>
        {/* View Mode */}
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={props.task.is_completed}
              onChange={() => props.onToggle(props.task)}
              onClick={(e) => e.stopPropagation()}
              class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
            <div
              onClick={() => setIsExpanded(!isExpanded())}
              class="flex-1 cursor-pointer select-none"
            >
              <span class={`text-gray-800 ${props.task.is_completed ? 'line-through text-gray-400' : ''}`}>
                {props.task.title}
              </span>
            </div>
          </div>
          <div class="flex gap-1">
            <button
              onClick={() => setIsEditing(true)}
              class="text-blue-500 hover:text-blue-700 p-1"
              title="Edit task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => props.onDelete(props.task.id)}
              class="text-red-500 hover:text-red-700 p-1"
              title="Delete task"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <Show when={isExpanded()}>
          <div class="mt-2 ml-8 text-sm text-gray-600">
            {props.task.description || <span class="italic text-gray-400">No description provided.</span>}
          </div>
        </Show>
      </Show>
    </div>
  );
};

const App: Component = () => {
  const [user, setUser] = createSignal<User | null>(null);
  const [loadingUser, setLoadingUser] = createSignal(true);
  const [authView, setAuthView] = createSignal<'login' | 'register'>('login');

  // Only fetch tasks if user is logged in
  const [tasks, { refetch }] = createResource(
    () => user() ? 'tasks' : null,
    fetchTasks
  );

  const [newTaskTitle, setNewTaskTitle] = createSignal('');
  const [newTaskDescription, setNewTaskDescription] = createSignal('');

  onMount(() => {
    console.log('App mounted. Fetching user...');
    axios.get('/api/user')
      .then((response) => {
        console.log('User found:', response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error('User fetch failed (likely 401):', error);
        setUser(null);
      })
      .finally(() => {
        console.log('Setting loading to false');
        setLoadingUser(false);
      });
  });

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await axios.post('/logout');
    setUser(null);
  };

  const addTask = async (e: Event) => {
    e.preventDefault();
    if (!newTaskTitle().trim()) return;

    try {
      await axios.post('/api/tasks', {
        title: newTaskTitle(),
        description: newTaskDescription(),
        is_completed: false
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      refetch();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      await axios.put(`/api/tasks/${task.id}`, {
        is_completed: !task.is_completed
      });
      refetch();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      refetch();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Show when={!loadingUser()} fallback={<div class="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Show when={user()} fallback={
        <Switch>
          <Match when={authView() === 'login'}>
            <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} />
          </Match>
          <Match when={authView() === 'register'}>
            <Register onLogin={handleLogin} onSwitchToLogin={() => setAuthView('login')} />
          </Match>
        </Switch>
      }>
        <div class="min-h-screen bg-gray-100 py-10 px-4">
          <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6 bg-blue-600 text-white flex justify-between items-center">
              <div>
                <h1 class="text-2xl font-bold">Task Manager</h1>
                <p class="text-blue-100 mt-1">Welcome, {user()?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                class="bg-blue-700 hover:bg-blue-800 text-white text-sm px-3 py-1 rounded transition-colors"
              >
                Logout
              </button>
            </div>

            <div class="p-6">
              <form onSubmit={addTask} class="flex flex-col gap-2 mb-6">
                <div class="flex gap-2">
                  <input
                    type="text"
                    value={newTaskTitle()}
                    onInput={(e) => setNewTaskTitle(e.currentTarget.value)}
                    placeholder="What needs to be done?"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <textarea
                  value={newTaskDescription()}
                  onInput={(e) => setNewTaskDescription(e.currentTarget.value)}
                  placeholder="Description (optional)"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-20 resize-none"
                />
              </form>

              <div class="space-y-3">
                <For each={tasks()} fallback={<div class="text-center text-gray-500">Loading tasks...</div>}>
                  {(task) => (
                    <TaskItem
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onUpdate={() => refetch()}
                    />
                  )}
                </For>

                {tasks() && tasks()?.length === 0 && (
                  <div class="text-center text-gray-500 py-4">
                    No tasks yet. Add one above!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Show>
    </Show>
  );
}; export default App;
