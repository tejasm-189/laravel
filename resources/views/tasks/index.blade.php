@extends('layouts.app')

@section('title', 'All Tasks')

@section('content')
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <h1>All Tasks</h1>
    <a href="{{ route('blade.tasks.create') }}" class="btn btn-primary">New Task</a>
</div>

@if(session('success'))
<div class="alert alert-success">
    {{ session('success') }}
</div>
@endif

@if($tasks->isEmpty())
<p>No tasks found.</p>
@else
<ul class="task-list">
    @foreach($tasks as $task)
    <li class="task-item">
        <div>
            <a href="{{ route('blade.tasks.show', $task->id) }}" class="task-title {{ $task->is_completed ? 'completed' : '' }}">
                {{ $task->title }}
            </a>
            <div class="task-desc">
                {{ Str::limit($task->description, 50) }}
            </div>
        </div>

        <div class="actions">
            <a href="{{ route('blade.tasks.edit', $task->id) }}" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;">Edit</a>
            <form action="{{ route('blade.tasks.toggle', $task->id) }}" method="POST" style="display:inline;">
                @csrf
                @method('PATCH')
                <button type="submit" class="btn" style="background: none; border: none; font-size: 1.25rem; padding: 0; cursor: pointer;" title="Toggle Status">
                    {{ $task->is_completed ? '✅' : '⬜' }}
                </button>
            </form>
        </div>
    </li>
    @endforeach
</ul>
<div style="margin-top: 1rem;">
    {{ $tasks->links() }}
</div>
@endif
@endsection