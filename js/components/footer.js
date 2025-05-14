// Footer component module
export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'custom-footer container-fluid';
  footer.innerHTML = `
        <div class="row">
            <!-- Logo and Company Info -->
            <div class="col-md-6 col-lg-4">
                <div class="brand-logo">
                    <img src="/assets/images/onebill-logo.png" alt="OneBill Logo" class="img-fluid">
                </div>
                <div class="footer-description">
                    <p><strong>OneBill Utilities Ltd is a registered company in Ireland.</strong></p>
                    <p><small><strong>CRO:</strong> 658186</small></p>
                    <p>&copy; Copyright 2025. All rights reserved.</p>
                </div>

                <!-- Social Media Icons -->
                <div class="social-icons-group">
                    <a href="https://twitter.com/OneBill_Ireland" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.instagram.com/onebill_utilities" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/company/onebillutilities/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://wa.me/+353858007335" target="_blank"><i class="fab fa-whatsapp"></i></a>
                    <a href="mailto:info@onebill.ie"><i class="fas fa-envelope"></i></a>
                </div>
            </div>

            <!-- Certifications -->
            <div class="col-md-6 col-lg-4 align-text-right">
                <div class="certification-badge">
                    <img src="/assets/images/accreditation-badge.png" alt="Accreditation Badge" class="img-fluid">
                </div>
            </div>

            <!-- Quick Links and Policies -->
            <div class="col-md-12 col-lg-4">
                <div class="row">
                    <div class="col-6">
                        <h5 class="quick-links-section">Quick Links</h5>
                        <div class="link-container">
                            <a href="/index.html">Home</a>
                            <a href="how-it-works.html">How It Works</a>
                            <a href="/faqs.html">FAQs</a>
                            <a href="contact-us.html">Contact Us</a>
                        </div>
                    </div>
                    <div class="col-6">
                        <h5 class="policies-section">Policies</h5>
                        <div class="link-container">
                            <a href="terms-conditions.html">Terms &amp; Conditions</a>
                            <a href="/privacy-policy.html">Privacy Policy</a>
                            <a href="cookie-policy.html">Cookie Policy</a>
                        </div>
                    </div>
                </div>

              <!-- Chat Button -->
              <a href="https://wa.me/353858007335" class="btn btn-outline-success chat-button-fixed shadow-sm chat">
                <i class="fab fa-whatsapp"></i> Chat With Us
              </a>
            </div>
        </div>

        <!-- Cookie Consent Modal -->
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="cookieConsentModal" tabindex="-1"
      role="dialog" aria-labelledby="cookieConsentModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cookieConsentModalLabel">
              Cookie Consent
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>
              We use cookies to enhance your browsing experience and provide
              personalized content. By clicking "Accept All," you agree to the
              use of cookies on our website. These cookies help us analyse
              site traffic, understand user behavior, and improve our
              services.
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal" id="rejectCookies">
              Reject All
            </button>
            <button type="button" class="btn btn-success" id="acceptCookies" data-bs-dismiss="modal">
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
    `;

  return footer;
}
