@extends('layouts.app')

@section('title', 'Edit Task')

@section('content')
<a href="{{ route('blade.tasks.index') }}" style="display: inline-block; margin-bottom: 1rem; color: #6b7280; text-decoration: none;">&larr; Back to List</a>
<h1>Edit Task</h1>

<form method="POST" action="{{ route('blade.tasks.update', $task->id) }}">
    @csrf
    @method('PUT')

    @include('tasks.partials.form')

    <div style="margin-top: 1.5rem;">
        <button type="submit" class="btn btn-primary">
            Update Task
        </button>
        <a href="{{ route('blade.tasks.index') }}" class="btn btn-secondary" style="margin-left: 0.5rem;">Cancel</a>
    </div>
</form>
@endsection