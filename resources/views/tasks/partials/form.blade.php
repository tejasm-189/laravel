<div class="form-group">
    <label for="title">Title</label>
    <input id="title" type="text" name="title" value="{{ old('title', $task->title ?? '') }}" autofocus>
    @error('title')
    <div style="color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;">{{ $message }}</div>
    @enderror
</div>

<div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" name="description" rows="5">{{ old('description', $task->description ?? '') }}</textarea>
    @error('description')
    <div style="color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;">{{ $message }}</div>
    @enderror
</div>