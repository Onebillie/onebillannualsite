"use strict";

var KTCreateAccount = function () {
    // Elements
    var modal;
    var modalEl;
    var stepper;
    var form;
    var formSubmitButton;
    var formContinueButton;
    var stepperObj;

    const params = new URLSearchParams(window.location.search);
    const input1Checked = params.get('input1');
    const input2Checked = params.get('input2');
    const input3Checked = params.get('input3');

    var xx = 2;
    var yy = 3;

    if (input1Checked === "true") {
        xx += 1;
        yy += 1;
    }

    if (input2Checked === "true") {
        xx += 1;
        yy += 1;
    } 

    if (input3Checked === "true") {
        xx += 1;
        yy += 1; 
    } 

    // Private Functions
    var initStepper = function () {
        // Initialize Stepper
        stepperObj = new KTStepper(stepper);

        // Collect steps to remove
        var stepsToRemove = [];

        if (input1Checked !== "true") {
            stepsToRemove.push(3);
            document.querySelector('.input1dsnane').style.display = 'none';
        } else {
            document.querySelector('.input1dsnane').style.display = 'block';
        }

        if (input2Checked !== "true") {
            stepsToRemove.push(4);
            document.querySelector('.input2dsnane').style.display = 'none';
        } else {
            document.querySelector('.input2dsnane').style.display = 'block';
        }

        if (input3Checked !== "true") {
            stepsToRemove.push(5);
            document.querySelector('.input3dsnane').style.display = 'none';
        } else {
            document.querySelector('.input3dsnane').style.display = 'block';
        }

        // Remove steps in reverse order to avoid index shifting issues
        stepsToRemove.sort((a, b) => b - a).forEach(removeStep);

        // Ensure the last step is always shown
        document.querySelector('.stepper-item[data-kt-stepper-element="nav"]:last-child').style.display = 'block';
        console.log(xx);
        console.log(yy);

        // Stepper change event
        stepperObj.on('kt.stepper.changed', function (stepper) {
            if (stepperObj.getCurrentStepIndex() === xx) {
                formSubmitButton.classList.remove('d-none');
                formSubmitButton.classList.add('d-inline-block');
                formContinueButton.classList.add('d-none');
            } else if (stepperObj.getCurrentStepIndex() === yy) {
                formSubmitButton.classList.add('d-none');
                formContinueButton.classList.add('d-none');
            } else {
                formSubmitButton.classList.remove('d-inline-block');
                formSubmitButton.classList.remove('d-none');
                formContinueButton.classList.remove('d-none');
            }
        });

        // Validation before going to next page
        stepperObj.on('kt.stepper.next', function (stepper) {
            // Validation logic
            if ($('#euroCheckbox').is(':checked') && $('#electricity_euro').val() == "0") {
                alert('Please enter a euro value!');
                return false; // Prevent stepper from going to the next step
            }

            if ($('#kwhCheckbox').is(':checked') && $('#electricity_kwh').val() == "0") {
                alert('Please enter a kwh value!');
                return false; // Prevent stepper from going to the next step
            }

            if ($('#gas_euroCheckbox').is(':checked') && $('#gas_euro').val() == "0") {
                alert('Please enter a euro value!');
                return false; // Prevent stepper from going to the next step
            }

            if ($('#gas_kwhCheckbox').is(':checked') && $('#gas_kwh').val() == "0") {
                alert('Please enter a kwh value!');
                return false; // Prevent stepper from going to the next step
            }




            //utilities
            if ($('.current').hasClass('utilities')) {
                var utilitiesvalidation = 0;
                var selectedValueSmart = $('#have_smart_meter').val();
                var placeholderSmart = $('#have_smart_meter').data('placeholder');
                if ((selectedValueSmart === '' || selectedValueSmart === placeholderSmart)) {
                       $('.smartvalidation').show();
                       utilitiesvalidation += 1;
                }else{
                    $('.smartvalidation').hide();
                }

                var selectedValueDescribe = $('#best_describe').val();
                var placeholderDescribe = $('#best_describe').data('placeholder');
                if ((selectedValueDescribe === '' || selectedValueDescribe === placeholderDescribe)) {
                       $('.describevalidation').show();
                       utilitiesvalidation += 1;
                }else{
                    $('.describevalidation').hide();
                }


                if(utilitiesvalidation >=1){
                    return false;
                }
               
            }
            //utilities

            //electricity
            if (input1Checked === "true") {
                var input1validation = 0;
                var selectedValue = $('#electricity_provider_id').val();
                var placeholder = $('#electricity_provider_id').data('placeholder');

                if ($('.current').hasClass('input1dsnane') && $('#euroCheckbox').is(':not(:checked)') && $('#kwhCheckbox').is(':not(:checked)') && $('#dontknowCheckbox').is(':not(:checked)')) {
                        $('.optionvalidation').show();
                        input1validation += 1;
                        
                }else{
                        $('.optionvalidation').hide();
                }

                var anySelectedMcc = $('input[name="mcc_id"]:checked').length > 0;
                if ($('.current').hasClass('input1dsnane') && !anySelectedMcc) {
                        $('.mccvalidation').show();
                        input1validation += 1;
                        
                }else{
                        $('.mccvalidation').hide();
                }

                var anySelectedDg = $('input[name="dg_type_id"]:checked').length > 0;
                if ($('.current').hasClass('input1dsnane') && !anySelectedDg) {
                        $('.dgvalidation').show();
                        input1validation += 1;
                        
                }else{
                        $('.dgvalidation').hide();
                }


                var anySelectedPayment = $('input[name="electricity_payment_type"]:checked').length > 0;
                if ($('.current').hasClass('input1dsnane') && !anySelectedPayment) {
                        $('.paymentvalidation').show();
                        input1validation += 1;
                        
                }else{

                    $('.paymentvalidation').hide();
                }


                if ($('.current').hasClass('input1dsnane') && (selectedValue === '' || selectedValue === placeholder)) {
                       $('.providervalidation').show();
                       input1validation += 1;
                       
                }else{
                    $('.providervalidation').hide();
                }


                if(input1validation >=1){
                    $('html, body').animate({
                        scrollTop: $('.valel').offset().top
                    }, 1000);
                    return false;
                }

            }
            //electricity

            //gas
            if (input2Checked === "true") {
                var input2validation = 0;
                var selectedValue1 = $('#gas_provider_id').val();
                var placeholder1 = $('#gas_provider_id').data('placeholder');

                if ($('.current').hasClass('input2dsnane') && (selectedValue1 === '' || selectedValue1 === placeholder1)) {
                       $('.gasprovidervalidation').show();
                       input2validation += 1;
                       
                }else{
                    $('.gasprovidervalidation').hide();
                }

                if ($('.current').hasClass('input2dsnane') && $('#gas_euroCheckbox').is(':not(:checked)') && $('#gas_kwhCheckbox').is(':not(:checked)') && $('#gas_dontknowCheckbox').is(':not(:checked)')) {
                       $('.gasoptionvalidation').show();
                       input2validation += 1;
                       
                }else{
                        $('.gasoptionvalidation').hide();
                }


                var anySelectedPayment1 = $('input[name="gas_payment_type"]:checked').length > 0;
                if ($('.current').hasClass('input2dsnane') && !anySelectedPayment1) {
                       $('.gaspaymentvalidation').show();
                       input2validation += 1;
                       
                }else{

                    $('.gaspaymentvalidation').hide();
                }

                if(input2validation >=1){
                    $('html, body').animate({
                        scrollTop: $('.valgas').offset().top
                    }, 1000);
                    return false;
                }

            }
            //gas

            //broadband
            if (input3Checked === "true") {
                var input3validation = 0;
                var selectedValue3 = $('#internet_provider_id').val();
                var placeholder3 = $('#internet_provider_id').data('placeholder');
                var internetprice = $('#internet_price').val();

                if ($('.current').hasClass('input3dsnane') && (selectedValue3 === '' || selectedValue3 === placeholder3)) {
                       $('.internetprovidervalidation').show();
                       input3validation += 1;
                       
                }else{
                    $('.internetprovidervalidation').hide();
                }

                if ($('.current').hasClass('input3dsnane') && (internetprice === "0" || internetprice === "")) {
                       $('.internetpricevalidation').show();
                       input3validation += 1;
                       
                }else{
                    $('.internetpricevalidation').hide();
                }

                var anySelectedBundle = $('input[name="bundle_part"]:checked').length > 0;

                if ($('.current').hasClass('input3dsnane') && anySelectedBundle) {

                        if ($(this).val() == '1' && $(this).is(':checked')) {
                            // Checkbox'ların kontrol edilmesi
                            var anyChecked = $('input[name="bundle_include[]"]').is(':checked');
                            if (!anyChecked) {
                                alert("Please select a value.");
                            }
                        }

                }else{
                        
                }

                if(input3validation >=1){
                    $('html, body').animate({
                        scrollTop: $('.valint').offset().top
                    }, 1000);
                    return false;
                }


            }
            //broadband

            stepper.goNext();

            KTUtil.scrollTop();
        });

        // Prev event
        stepperObj.on('kt.stepper.previous', function (stepper) {
            console.log('stepper.previous');

            stepper.goPrevious();
            KTUtil.scrollTop();
        });
    }

    var handleForm = function() {
        formSubmitButton.addEventListener('click', function (e) {
           
            e.preventDefault();

              //electricity
            if (input1Checked === "true") {
                var input1validation = 0;
                var selectedValue = $('#electricity_provider_id').val();
                var placeholder = $('#electricity_provider_id').data('placeholder');

                if ($('.current').hasClass('input1dsnane') && (selectedValue === '' || selectedValue === placeholder)) {
                       $('.providervalidation').show();
                       input1validation += 1;
                      
                }else{
                    $('.providervalidation').hide();
                }

                if ($('.current').hasClass('input1dsnane') && $('#euroCheckbox').is(':not(:checked)') && $('#kwhCheckbox').is(':not(:checked)') && $('#dontknowCheckbox').is(':not(:checked)')) {
                       $('.optionvalidation').show();
                       input1validation += 1;
                       
                }else{
                        $('.optionvalidation').hide();
                }

                var anySelectedMcc = $('input[name="mcc_id"]:checked').length > 0;
                if ($('.current').hasClass('input1dsnane') && !anySelectedMcc) {
                       $('.mccvalidation').show();
                       input1validation += 1;
                       
                }else{
                        $('.mccvalidation').hide();
                }

                var anySelectedDg = $('input[name="dg_type_id"]:checked').length > 0;
                if ($('.current').hasClass('input1dsnane') && !anySelectedDg) {
                       $('.dgvalidation').show();
                       input1validation += 1;
                       
                }else{
                        $('.dgvalidation').hide();
                }

                var anySelectedPayment = $('input[name="electricity_payment_type"]:checked').length > 0;
                if ($('.current').hasClass('input1dsnane') && !anySelectedPayment) {
                       $('.paymentvalidation').show();
                       input1validation += 1;
                       
                }else{

                    $('.paymentvalidation').hide();
                }

                if(input1validation >=1){
                    $('html, body').animate({
                        scrollTop: $('.valel').offset().top
                    }, 1000);
                    return false;
                }

            }
            //electricity

            //gas
            if (input2Checked === "true") {
                var input2validation = 0;
                var selectedValue1 = $('#gas_provider_id').val();
                var placeholder1 = $('#gas_provider_id').data('placeholder');

                if ($('.current').hasClass('input2dsnane') && (selectedValue1 === '' || selectedValue1 === placeholder1)) {
                       $('.gasprovidervalidation').show();
                       input2validation += 1;
                       
                }else{
                    $('.gasprovidervalidation').hide();
                }

                if ($('.current').hasClass('input2dsnane') && $('#gas_euroCheckbox').is(':not(:checked)') && $('#gas_kwhCheckbox').is(':not(:checked)') && $('#gas_dontknowCheckbox').is(':not(:checked)')) {
                       $('.gasoptionvalidation').show();
                       input2validation += 1;
                       
                }else{
                        $('.gasoptionvalidation').hide();
                }


                var anySelectedPayment1 = $('input[name="gas_payment_type"]:checked').length > 0;
                if ($('.current').hasClass('input2dsnane') && !anySelectedPayment1) {
                    $('.gaspaymentvalidation').show();
                    input2validation += 1;
                    
                }else{

                    $('.gaspaymentvalidation').hide();
                }



                if(input2validation >=1){
                    $('html, body').animate({
                        scrollTop: $('.valgas').offset().top
                    }, 1000);
                    return false;
                }

            }
            //gas

            //broadband
            if (input3Checked === "true") {
                var input3validation = 0;
                var selectedValue3 = $('#internet_provider_id').val();
                var placeholder3 = $('#internet_provider_id').data('placeholder');
                var internetprice = $('#internet_price').val();

                if ($('.current').hasClass('input3dsnane') && (selectedValue3 === '' || selectedValue3 === placeholder3)) {
                       $('.internetprovidervalidation').show();
                       input3validation += 1;
                      
                }else{
                    $('.internetprovidervalidation').hide();
                }

                if ($('.current').hasClass('input3dsnane') && (internetprice === "0" || internetprice === "")) {
                       $('.internetpricevalidation').show();
                       input3validation += 1;
                       
                }else{
                    $('.internetpricevalidation').hide();
                }

                var anySelectedBundle = $('input[name="bundle_part"]:checked').length > 0;
                if ($('.current').hasClass('input3dsnane') && anySelectedBundle) {
                    var cnt = $('input[name="bundle_part"]:checked').val();

                    if (cnt == '1') {
                        // Checkbox'ların kontrol edilmesi
                        var anyChecked1 = $('input[name="bundle_include[]"]').is(':checked');
                        if (!anyChecked1) {
                            alert("Please select at least one service in the 'What’s included in Your Bundle?' section.");
                            return false; // İşlemi durdurur
                        }
                    }
                } else {
                    // Bu blok boş bırakılmış
                }


                if(input3validation >=1){
                    $('html, body').animate({
                        scrollTop: $('.valint').offset().top
                    }, 1000);
                    return false;
                }


            }
            //broadband

            // Disable button to avoid multiple click 
            formSubmitButton.disabled = true;

            // Show loading indication
            formSubmitButton.setAttribute('data-kt-indicator', 'on');



            // Simulate form submission
            setTimeout(function() {
                // Hide loading indication
                formSubmitButton.removeAttribute('data-kt-indicator');

                // Enable button
                formSubmitButton.disabled = false;

                stepperObj.goNext();
                KTUtil.scrollTop();
            }, 2000);
                
           
        });
    }

    var removeStep = function(stepIndex) {
        var steps = stepper.querySelectorAll('[data-kt-stepper-element="content"]');
        if (steps[stepIndex - 1]) {
            steps[stepIndex - 1].parentNode.removeChild(steps[stepIndex - 1]);
        }
    }

    return {
        // Public Functions
        init: function () {
            // Elements
            modalEl = document.querySelector('#kt_modal_create_account');

            if ( modalEl ) {
                modal = new bootstrap.Modal(modalEl);
            }

            stepper = document.querySelector('#kt_create_account_stepper');

            if ( !stepper ) {
                return;
            }

            form = stepper.querySelector('#kt_create_account_form');
            formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
            formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');

            initStepper();
            handleForm();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTCreateAccount.init();
});
