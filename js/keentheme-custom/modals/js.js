$(document).ready(function(){
    var tok = localStorage.getItem('tok');

    if(tok !== 'null'){
        $.ajax({
            url: "https://admin.onebill.ie/api/getInfluencerInfo", 
            type: "POST", 
            data: {
                token: tok
            },
            dataType: 'json',
            success: function(response) {
                var monthlyTotal = response.monthly_total;
                var yearlyTotal = response.yearly_total;
                var text = response.text;

                window.localStorage.setItem('monthly_fee', response.monthly_total);
                window.localStorage.setItem('yearly_fee', response.yearly_total);

                $(".price").attr("data-monthly", monthlyTotal);
                $(".price").attr("data-annually", yearlyTotal);
                $(".price b").text("€" + monthlyTotal);

                if(text == null){
                    $('#influencer_info').html('You will receive 2 months of free membership by paying annually.');
                    
                }else{
                    $('#influencer_info').html(text);
                }
                
            },
            error: function(xhr, status, error) {
                console.error("Error fetching tariffs:", error);
            }
        });
    }else{
        window.localStorage.setItem('monthly_fee', 10);
        window.localStorage.setItem('yearly_fee', 100);
    }


    function checkFields() {
        let password = $('#password').val();
        let confirmPassword = $('#confirmpassword').val();
        let button = $('.submit');

        if (password === confirmPassword) {
            button.css('background-color', '#28a745');
            button.prop('disabled', false);
        } else {
            button.css('background-color', '#6c757d');
            button.prop('disabled', true);
        }
    }

    checkFields();
    
});


document.addEventListener("DOMContentLoaded", function() {
        var tok = localStorage.getItem('tok');
        const monthlyRadio = document.getElementById('monthly');
        const yearlyRadio = document.getElementById('yearly');
        const paymentPeriodSelect = document.getElementById('payment_period');
        const annualPaymentInfo = document.getElementById('annual-payment-info');
        const monthlyFreeMembershipMessage = document.getElementById('monthly-free-membership-message');
        const priceElement = document.querySelector('.price');
        var monthlyPaymentOptions = document.getElementById('monthly-payment-options');

        
        monthlyRadio.checked = true;
        paymentPeriodSelect.value = "Monthly";

        
        const currentURL = window.location.href;
        const hasReferenceParam = currentURL.includes('?reference=ClaireClarkson');

       
        if (hasReferenceParam) {
            monthlyFreeMembershipMessage.style.display = "block";
        }

        
        function updatePaymentInfoDisplay() {

            if (paymentPeriodSelect.value === "Yearly") { 
                monthlyPaymentOptions.style.display = 'none';
                $.ajax({
                    url: "https://admin.onebill.ie/api/getInfluencerInfo", 
                    type: "POST", 
                    data: {
                        token: tok
                    },
                    dataType: 'json',
                    success: function(response) {
                        var text = response.text_yearly;
                        if(text == null){
                            $('#influencer_info').html('You will need to pay €99 upfront as a one-time payment for your annual subscription.');
                            
                        }else{
                            $('#influencer_info').html(text);
                        }
                        
                    },
                    error: function(xhr, status, error) {
                        console.error("Error fetching tariffs:", error);
                    }
                });

                annualPaymentInfo.style.display = "block";
                monthlyFreeMembershipMessage.style.display = "none";
                let annualPrice = priceElement.getAttribute('data-annually');
                priceElement.innerHTML = `<b>€${annualPrice}</b> Per Year`;
            } else if (paymentPeriodSelect.value === "Monthly") {
                monthlyPaymentOptions.style.display = 'block';
                $.ajax({
                    url: "https://admin.onebill.ie/api/getInfluencerInfo", 
                    type: "POST", 
                    data: {
                        token: tok
                    },
                    dataType: 'json',
                    success: function(response) {
                        var text = response.text;
                        if(text == null){
                            $('#influencer_info').html('Your monthly payment is €10, but if you choose the annual payment option, you will receive a €20 discount.');
                            
                        }else{
                            $('#influencer_info').html(text);
                        }
                        
                    },
                    error: function(xhr, status, error) {
                        console.error("Error fetching tariffs:", error);
                    }
                });

                annualPaymentInfo.style.display = "none";
                if (hasReferenceParam) {
                    monthlyFreeMembershipMessage.style.display = "block";
                }
                let monthlyPrice = priceElement.getAttribute('data-monthly');
                priceElement.innerHTML = `<b>€${monthlyPrice}</b> Per Month`;
            }
        }

        monthlyRadio.addEventListener('change', function() {
            if (this.checked) {
                paymentPeriodSelect.value = "Monthly";
                updatePaymentInfoDisplay();
            }
        });

       
        yearlyRadio.addEventListener('change', function() {
            if (this.checked) {
                paymentPeriodSelect.value = "Yearly";
                updatePaymentInfoDisplay();
            }
        });

       
        paymentPeriodSelect.addEventListener('change', function() {
            if (this.value === "Monthly") {
                monthlyRadio.checked = true;
            } else if (this.value === "Yearly") {
                yearlyRadio.checked = true;
            }
            updatePaymentInfoDisplay();
        });


        updatePaymentInfoDisplay();
    });
