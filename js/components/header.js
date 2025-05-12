/** Header component only used in the main page */
export function createHomeHeader() {
  const header = document.createElement('header');
  header.innerHTML = `
        <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid ps-lg-5 pe-lg-5">
                <a class="navbar-brand" href="/index.html">
                  <img src="assets/images/onebill-logo.png" alt="OneBill Logo" height="45">
                </a>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mb-2 ms-lg-auto mb-lg-0 gap-2">
                        <li class="nav-item"><a class="nav-link" href="/book-a-call.html">Book A Call</a></li>
                        <li class="nav-item"><a class="nav-link" href="how-it-works.html">How It Works</a></li>
                        <li class="nav-item"><a class="nav-link" href="price.html">Pricing</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="guidesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Guides</a>
                            <ul class="dropdown-menu" aria-labelledby="guidesDropdown">
                                <li><a class="dropdown-item" href="/guides/smartmeters.html">Smart Meters</a></li>
                                <li><a class="dropdown-item" href="/guides/solar-batt-ev.html">Solar, Batteries & EV's</a></li>
                                <li><a class="dropdown-item" href="/guides/tou.html">What Are Time of Use Tariffs (ToU)</a></li>
                                <li><a class="dropdown-item" href="/guides/AutoSwitch.html">AutoSwitch'ing Explained</a></li>
                                <li><a class="dropdown-item" href="/guides/Meter-Readings.html">Meter Readings</a></li>
                                <li><a class="dropdown-item" href="/guides/EstimatedBills.html">Estimated Bills</a></li>
                                <li><a class="dropdown-item" href="/guides/DownloadingHDF.html">Downloading Your HDF File</a></li>
                            </ul>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="contact-us.html">Contact Us</a></li>
                        <li class="nav-item">
                            <a class="btn btn-outline-success btn-small" href="https://admin.onebill.ie/portal/login">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
  return header;
}
