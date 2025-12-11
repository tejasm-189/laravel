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
            <span style="font-size: 1.25rem;">{{ $task->is_completed ? '✅' : 'jq' }}</span>
        </div>
    </li>
    @endforeach
</ul>
@endif
@endsection