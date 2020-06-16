<nav class="navbar navbar-expand-lg navbar-light bg-white pt-md-2 pt-3">
    <div class="container">
      <a class="navbar-brand h1 text-body font-weight-bolder font-heading mb-0" href="/">
        <img src="{{ asset('logo.svg') }}" alt="" height="35">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse rounded" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto align-items-md-center text-center">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="auth = true; action = 'login'">Login</a>
          </li>
          <li class="nav-item">
            <div class="nav-link pr-0">
              <div class="px-3 px-md-0">
                <a class="btn btn-orange btn-sm-block text-white m-0" href="#" @click.prevent="auth = true; action = 'signup'">Sign Up</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</nav>

