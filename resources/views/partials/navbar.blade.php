<nav class="bg-secondary">
    <div class="hidden lg:block container mx-auto px-2 py-2 sm:px-4 lg:px-4">
        <div class="flex items-center justify-between h-16">
            <div>
                <a href="{{ config('app.url') }}"><img class="h-7 w-auto" src="{{ asset('telloe.svg') }}" alt="{{ config('app.name') }}"></a>
            </div>
            <div class="ml-auto flex">
                <div class="flex align-middle items-center space-x-3">
                    <a href="/" class="navbar-item">HOME</a>
                    <a href="/#features" class="navbar-item">FEATURES</a>
                    <a href="/#about" class="navbar-item"><span>ABOUT</span></a>
                    <a href="/#pricing" class="navbar-item"><span>PRICING</span></a>
                    <a href="/contact" class="navbar-item"><span>CONTACT US</span></a>
                    @auth
                    <a href="/dashboard/calendar" class="btn btn-primary btn-md"><span class="block">DASHBOARD</span></a>
                    @endauth
                    @guest
                    <button type="button" class="navbar-item" @click="auth = true; action = 'login'"><span>LOGIN</span></button>
                    <button type="button" class="btn btn-primary btn-md" @click="auth = true; action = 'signup'"><span class="font-serif">SIGN UP</span> </button>
                    @endguest
                </div>
            </div>
        </div>
    </div>

    <div class="fixed z-50 w-full top-0 left-0 flex justify-between items-center lg:hidden p-4 bg-secondary">
        <div>
            <a href="{{ config('app.url') }}"><img class="h-7 w-auto" src="{{ asset('telloe.svg') }}" alt="{{ config('app.name') }}"></a>
        </div>
        <div v-click-outside="() => (dropdownOpen = false)">
          <button type="button" :class="{active: dropdownOpen}" class="navbar-mobile-btn" @click="dropdownOpen = !dropdownOpen">
            <svg class="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
          </button>

          <div class="navbar-mobile-menu" :class="{open: dropdownOpen}">
             <div class="rounded-xl shadow-md bg-white py-2 px-2">
                <a href="/" @click="dropdownOpen = false">HOME</a>
                <a href="/#features" @click="dropdownOpen = false">FEATURES</a>
                <a href="/#about" @click="dropdownOpen = false">ABOUT</a>
                <a href="/#pricing" @click="dropdownOpen = false">PRICING</a>
                <a href="/contact" @click="dropdownOpen = false">CONTACT US</a>
                @auth
                <a href="/dashboard/calendar" @click="dropdownOpen = false">DASHBOARD</a>
                @endauth
                @guest
                <div class="px-2 mt-4">
                    <button type="button" class="btn btn-outline-primary btn-md mb-2 w-full" @click="auth = true; action = 'login'; dropdownOpen = false"><span>LOGIN</span></button>
                </div>
                <div class="px-2 pb-2">
                    <button type="button" class="btn btn-primary btn-md w-full" @click="auth = true; action = 'signup'; dropdownOpen = false"><span>SIGN UP</span></button>
                </div>
                @endguest
             </div>
          </div>
        </div>
    </div>
</nav>
