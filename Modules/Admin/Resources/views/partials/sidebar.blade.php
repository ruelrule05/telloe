<div class="bg-white dashboard-sidebar">
    <div class="navbar sidebar-heading shadow-sm bg-white">
      <button class="navbar-toggler line-height-0" @click="$root.toggleSidebar()" :class="{toggled: $root.sidebar_toggle}">
        <span class="navbar-toggler-icon"></span>
      </button>
        <img src="{{ asset('logo.svg') }}" alt=""><span class="font-size-13 text-gray align-self-center">ADMIN</span>
    </div>

    <div class="sidebar-content bg-white d-flex flex-column font-weight-500 shadow-sm h-100 overflow-auto">
      <div class="py-3 flex-grow-1" v-cloak>
        <div class="px-2">
          @if (Auth::user()->is_assistant)
          <div class="mb-4 mt-n1 px-2">
            <span class="font-size-13 font-weight-300">Profile Progress</span>
            <div class="progress">
              <div class="progress-bar bg-primary" role="progressbar" :style="'width:' + this.$root.auth.profile_points + '%'">
                @{{ this.$root.auth.profile_points }}%
              </div>
            </div>
          </div>
          @endif
          <div class="list-group">
              <router-link to="/users" class="list-group-item list-group-item-action border-0 rounded transition font-circular" exact>
                  Users
              </router-link>
              <router-link to="/plans" class="list-group-item list-group-item-action border-0 rounded transition font-circular" exact>
                  Plans
              </router-link>
          </div>
        </div>
      </div>

      <div class="position-relative px-2 d-sm-block d-md-none d-lg-none sidebar-dropdown py-2">
    
      </div>
    </div>
</div>