<nav class="bg-secondary">
    <div class="max-w-7xl mx-auto px-2 py-2 sm:px-4 lg:px-4">
        <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="flex-shrink-0 flex items-center">
                <img class="block lg:hidden h-7 w-auto" src="{{ asset('telloe.svg') }}" alt="{{ config('app.mame') }}">
                <img class="hidden lg:block h-7 w-auto" src="{{ asset('telloe.svg') }}" alt="{{ config('app.mame') }}">
                </div>
            </div>
            <div class="ml-auto flex">
                <div class="flex align-middle items-center space-x-3">
                    <button type="button" class="navbar-item"><span>HOME</span></button>
                    <a href="#features" class="navbar-item">FEATURES</a>
                    <a href="#about" type="button" class="navbar-item"><span>ABOUT</span></a>
                    <a href="#pricing" type="button" class="navbar-item"><span>PRICING</span></a>
                    <button type="button" class="navbar-item" @click.prevent="auth = true; action = 'login'"><span>LOGIN</span></button>
                    <button type="button" class="btn btn-primary btn-md" @click.prevent="auth = true; action = 'signup'"><span class="font-serif">SIGN UP</span> </button>
                </div>
            </div>
        </div>
    </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  <div class="sm:hidden" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>
