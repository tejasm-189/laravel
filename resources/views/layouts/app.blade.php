<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Task Manager')</title>
    <!-- Simple CSS for the demo -->
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background-color: #f3f4f6; color: #1f2937; line-height: 1.5; padding: 2rem; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        h1 { font-size: 1.875rem; font-weight: bold; margin-bottom: 1.5rem; color: #111827; }
        .btn { display: inline-block; padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 500; text-decoration: none; cursor: pointer; border: none; font-size: 0.875rem; transition: background-color 0.2s; }
        .btn-primary { background-color: #3b82f6; color: white; }
        .btn-primary:hover { background-color: #2563eb; }
        .btn-secondary { background-color: #e5e7eb; color: #374151; }
        .btn-secondary:hover { background-color: #d1d5db; }
        .btn-danger { background-color: #ef4444; color: white; }
        .btn-danger:hover { background-color: #dc2626; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; font-weight: 500; margin-bottom: 0.5rem; color: #374151; }
        input[type="text"], textarea { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; margin-top: 0.25rem; box-sizing: border-box; }
        input[type="text"]:focus, textarea:focus { outline: none; border-color: #3b82f6; ring: 2px solid #93c5fd; }
        .alert { padding: 1rem; border-radius: 0.375rem; margin-bottom: 1rem; }
        .alert-success { background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
        .alert-error { background-color: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
        .task-list { list-style: none; padding: 0; }
        .task-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #e5e7eb; }
        .task-item:last-child { border-bottom: none; }
        .task-title { font-weight: 600; font-size: 1.125rem; color: #111827; text-decoration: none; }
        .task-title:hover { color: #3b82f6; }
        .task-desc { color: #6b7280; font-size: 0.875rem; margin-top: 0.25rem; }
        .actions { display: flex; gap: 0.5rem; }
    </style>
</head>
<body>
    <div class="container">
        @yield('content')
    </div>
</body>
</html>
