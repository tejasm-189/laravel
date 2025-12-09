import { createSignal, type Component } from 'solid-js';
import axios from 'axios';

type RegisterProps = {
  onLogin: (user: any) => void;
  onSwitchToLogin: () => void;
};

const Register: Component<RegisterProps> = (props) => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [passwordConfirmation, setPasswordConfirmation] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Get CSRF Cookie
      await axios.get('/sanctum/csrf-cookie');

      // 2. Register
      const response = await axios.post('/register', {
        name: name(),
        email: email(),
        password: password(),
        password_confirmation: passwordConfirmation()
      });

      // 3. Pass user back to parent
      props.onLogin(response.data.user);
    } catch (err: any) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        // Just show the first error for simplicity
        const firstError = Object.values(errors)[0] as string[];
        setError(firstError[0]);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
        
        {error() && (
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error()}
          </div>
        )}

        <form onSubmit={handleSubmit} class="space-y-6">
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password_confirmation">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              value={passwordConfirmation()}
              onInput={(e) => setPasswordConfirmation(e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading()}
            class={`w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading() ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div class="mt-4 text-center text-sm text-gray-600">
            <p>Already have an account? <button onClick={props.onSwitchToLogin} class="text-blue-600 hover:underline font-bold">Sign In</button></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
