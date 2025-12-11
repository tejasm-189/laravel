@extends('layouts.app')

@section('title', 'Create Task')

@section('content')
<a href="{{ route('blade.tasks.index') }}" style="display: inline-block; margin-bottom: 1rem; color: #6b7280; text-decoration: none;">&larr; Back to List</a>
<h1>Create New Task</h1>

<form action="{{ route('blade.tasks.store') }}" method="POST">
    @csrf

    <!-- Display General Errors -->
    @if ($errors->any())
    <div class="alert alert-error">
        <ul style="margin: 0; padding-left: 1.5rem;">
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    @include('tasks.partials.form', ['task' => null])

    <button type="submit" class="btn btn-primary">Create Task</button>
</form>
@endsection