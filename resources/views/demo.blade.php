<!DOCTYPE html>
<html>
<head>
    <title>Blade Demo</title>
    <!-- Simple CSS to make it look decent -->
    <style>
        body { font-family: sans-serif; padding: 2rem; }
        .card { border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; }
        .completed { text-decoration: line-through; color: gray; }
    </style>
</head>
<body>
    <h1>Hello, {{ $name }}!</h1>
    <p>This page is rendered entirely by the server using <strong>Blade</strong>.</p>

    <h2>Your Tasks (Server-Side Rendered)</h2>
    
    @if($tasks->isEmpty())
        <p>No tasks found.</p>
    @else
        @foreach($tasks as $task)
            <div class="card">
                <h3 class="{{ $task->is_completed ? 'completed' : '' }}">
                    {{ $task->title }}
                </h3>
                @if($task->description)
                    <p>{{ $task->description }}</p>
                @endif
                <small>Status: {{ $task->is_completed ? 'Done' : 'Pending' }}</small>
            </div>
        @endforeach
    @endif
</body>
</html>
