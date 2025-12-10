@extends('layouts.app')

@section('title', 'Edit Task')

@section('content')
    <a href="{{ route('blade.tasks.index') }}" style="display: inline-block; margin-bottom: 1rem; color: #6b7280; text-decoration: none;">&larr; Back to List</a>
    <h1>Edit Task</h1>

    <form method="POST" action="{{ route('blade.tasks.update', $task->id) }}">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="title">Title</label>
            <input id="title" type="text" name="title" value="{{ old('title', $task->title) }}" autofocus>
            @error('title')
                <div style="color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;">{{ $message }}</div>
            @enderror
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" rows="5">{{ old('description', $task->description) }}</textarea>
            @error('description')
                <div style="color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;">{{ $message }}</div>
            @enderror
        </div>

        <div style="margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary">
                Update Task
            </button>
            <a href="{{ route('blade.tasks.index') }}" class="btn btn-secondary" style="margin-left: 0.5rem;">Cancel</a>
        </div>
    </form>
@endsection
