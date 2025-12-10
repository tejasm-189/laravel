@extends('layouts.app')

@section('title', 'Task Details')

@section('content')
    <a href="{{ route('blade.tasks.index') }}" style="display: inline-block; margin-bottom: 1rem; color: #6b7280; text-decoration: none;">&larr; Back to List</a>
    
    <div style="border: 1px solid #e5e7eb; padding: 1.5rem; border-radius: 0.5rem; background: white;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <h1 style="margin: 0; font-size: 1.5rem;">{{ $task->title }}</h1>
            <span style="padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; background: {{ $task->is_completed ? '#d1fae5; color: #065f46;' : '#f3f4f6; color: #374151;' }}">
                {{ $task->is_completed ? 'Completed' : 'Pending' }}
            </span>
        </div>
        
        <div style="color: #4b5563; line-height: 1.6;">
            @if($task->description)
                <p style="white-space: pre-wrap;">{{ $task->description }}</p>
            @else
                <p><em>No description provided.</em></p>
            @endif
        </div>
        
        <div style="margin-top: 2rem; border-top: 1px solid #e5e7eb; padding-top: 1rem; color: #9ca3af; font-size: 0.875rem; display: flex; justify-content: space-between; align-items: center;">
            <span>Created: {{ $task->created_at->format('M d, Y') }}</span>
            <a href="{{ route('blade.tasks.edit', $task->id) }}" class="btn btn-secondary">Edit Task</a>
        </div>
    </div>
@endsection
