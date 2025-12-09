import { createSignal, type Component } from 'solid-js';
import axios from 'axios';

type LoginProps = {
  onLogin: (user: any) => void;
  onSwitchToRegister: () => void;
};

const Login: Component<LoginProps> = (props) => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Get CSRF Cookie
      await axios.get('/sanctum/csrf-cookie');

      // 2. Login
      const response = await axios.post('/login', {
        email: email(),
        password: password()
      });

      // 3. Pass user back to parent
      props.onLogin(response.data.user);
    } catch (err: any) {
      if (err.response?.status === 422) {
        setError(err.response.data.message || 'Invalid credentials');
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
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Sign In</h2>
        
        {error() && (
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error()}
          </div>
        )}

        <form onSubmit={handleSubmit} class="space-y-6">
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

          <button
            type="submit"
            disabled={loading()}
            class={`w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading() ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div class="mt-4 text-center text-sm text-gray-600">
            <p>Use <b>test@example.com</b> / <b>password</b></p>
            <p class="mt-2">Don't have an account? <button onClick={props.onSwitchToRegister} class="text-blue-600 hover:underline font-bold">Register</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
