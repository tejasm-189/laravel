<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\Task;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);

// Demo route to show Blade usage
// Demo routes for Blade
Route::prefix('blade-demo')->group(function () {

    // Main demo page
    Route::get('/', function () {
        $name = 'Developer';
        $tasks = \App\Models\Task::take(5)->paginate(5);
        return view('demo', compact('name', 'tasks'));
    });

    // Task List
    // Task List
    Route::get('/tasks', function () {
        $tasks = \App\Models\Task::latest()->paginate(5);
        return view('tasks.index', compact('tasks'));
    })->name('blade.tasks.index');

    // Create Task Form
    Route::get('/tasks/create', function () {
        return view('tasks.create');
    })->name('blade.tasks.create');

    // Store Task (Handle Form Submit)
    Route::post('/tasks', function (TaskRequest $request) {
        Task::create($request->validated());

        return redirect()->route('blade.tasks.index')->with('success', 'Task created successfully!');
    })->name('blade.tasks.store');

    // Show Task Details

    // Show Task Details
    Route::get('/tasks/{task}', function (Task $task) {
        return view('tasks.show', ['task' => $task]);
    })->name('blade.tasks.show');

    // Edit Task Form
    Route::get('/tasks/{task}/edit', function (Task $task) {
        return view('tasks.edit', ['task' => $task]);
    })->name('blade.tasks.edit');

    // Update Task (Handle Edit Submit)
    Route::put('/tasks/{task}', function (TaskRequest $request, Task $task) {
        $task->update($request->validated());

        return redirect()->route('blade.tasks.index')->with('success', 'Task updated successfully!');
    })->name('blade.tasks.update');

    // Delete Task
    Route::delete('/tasks/{task}', function (Task $task) {
        $task->delete();
        return redirect()->route('blade.tasks.index')->with('success', 'Task deleted successfully!');
    })->name('blade.tasks.destroy');
});
