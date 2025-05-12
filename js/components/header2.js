/** Header component used in the pages except main page */
export function createHeader() {
  const header = document.createElement('header');
  header.innerHTML = `
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary header2">
      <div class="container-fluid ps-lg-5 pe-lg-5">
        <a class="navbar-brand" href="/index.html">
          <img alt="OneBill Logo" height="45" src="../assets/images/onebill-logo.png" />
        </a>
        <button aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation" class="navbar-toggler border-0" data-bs-target="#navbarSupportedContent"
          data-bs-toggle="collapse" type="button">
          <span class="navbar-toggler-icon"> </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 ms-lg-auto mb-lg-0 gap-2">
            <li class="nav-item">
              <a aria-current="page" id="autoClick" class="nav-link" href="/index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/how-it-works.html">How It Works</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/pricing.html">Pricing</a>
            </li>

            <div class="dropdown">
              <button class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Guides</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/guides/smartmeters.html">Smart Meters</a></li>
                <li><a class="dropdown-item" href="/guides/solar-batt-ev.html">Solar, Batteries & EV's</a></li>
                <li><a class="dropdown-item" href="/guides/tou.html">What Are Time of Use Tariffs (ToU)</a></li>
                <li><a class="dropdown-item" href="/guides/autoswitch.html">AutoSwitching Explained</a></li>
                <li><a class="dropdown-item" href="/guides/meter-readings.html">Meter Readings</a></li>
                <li><a class="dropdown-item" href="/guides/estimated-bills.html">Estimated Bills</a></li>
                <li><a class="dropdown-item" href="/guides/how-to-download-hdf.html">Downloading Your HDF File</a></li>
              </ul>
            </div>

            <li class="nav-item navitemSonBorder">
              <a class="nav-link" href="/contact-us.html">Contact Us</a>
            </li>

            <li class="nav-item">
              <a class="btn btn-success btn-small  mr-10" id="redirectButton" href="/">Sign Up</a>
              <a class="btn btn-outline-success btn-small" href="https://admin.onebill.ie/portal/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    `;
  return header;
}
