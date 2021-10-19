<nav class="bg-secondary">
    <div class="hidden lg:block container mx-auto px-2 py-2 sm:px-4 lg:px-4">
        <div class="flex items-center justify-between h-16">
            <div>
                <a href="/affiliates"><img class="h-7 w-auto" src="/telloe.svg" alt="telloe">
                    <p class="text-xl" style="color: #3465e4; padding-top: 0px;">Affiliate Program</p>
                </a>
            </div>
            <div class="ml-auto flex">
                <div class="flex align-middle items-center space-x-3">
                    <a href="/affiliates" class="navbar-item">AFFILIATE HOME</a>
                    <a href="https://go.telloe.com/register.html" class="navbar-item">JOIN PROGRAM</a>
                    <a href="/affiliate-terms" target="_blank" class="navbar-item">AFFILIATE TERMS AND CONDITIONS</a>
                    <button type="button" class="btn btn-primary btn-md" onclick="window.location.href='https://go.telloe.com';"><span class="font-serif">AFFILIATE LOGIN</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed z-50 w-full top-0 left-0 flex justify-between items-center lg:hidden p-4 bg-secondary">
        <div>
            <a href=""><img class="h-7 w-auto" src="/telloe.svg" alt="telloe"></a>
            <p class="text-xl" style="color: #3465e4; padding-top: 0px;">Affiliate Program</p>
        </div>
        <div>
            <button type="button" :class="{active: dropdownOpen}" class="navbar-mobile-btn" v-click-outside="() => (dropdownOpen = false)" @click="dropdownOpen = !dropdownOpen">
                <svg class="block h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div class="navbar-mobile-menu" :class="{open: dropdownOpen}" style="padding-top: 30px;">
                <div class="rounded-xl shadow-md bg-white py-2 px-2">
                    <a href="/affiliates">AFFILIATE HOME</a>
                    <a href="https://go.telloe.com/register.html">JOIN PROGRAM</a>
                    <a href="/affiliate-terms">AFFILIATE TERMS AND CONDITIONS</a>
                    <div class="px-2 pb-2">
                        <button type="button" class="btn btn-primary btn-md w-full" onclick="window.location.href='https://go.telloe.com';"><span>AFFILIATE LOGIN</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>