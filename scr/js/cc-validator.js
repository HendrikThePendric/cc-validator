(function() {
    // Validator class
    function CcValidator () {
        this.$inputEl         = $('#cc-input');
        this.$ccTypeEl        = $('#cc-type');
        this.$successEl       = $('#cc-valid');
        this.ccType           = '?';
        this.ccValid          = false;
        this.attachValidatorPlugin();
    }
    CcValidator.prototype.attachValidatorPlugin = function () {
        this.$inputEl.validateCreditCard(this.updateUi.bind(this));
    };
    CcValidator.prototype.updateUi = function (result) {
        // Only do DOM updates when an actual change has been detected
        if (result.card_type !== this.ccType) {
            this.updateCcType(result.card_type);
        }
        if (result.valid !== this.ccValid) {
            this.updateValidity(result.valid);
        }
    };
    CcValidator.prototype.updateCcType = function (typeObj) {
        this.ccType = typeObj && typeObj.name ? typeObj.name : '?';
        this.$ccTypeEl.text(this.ccType);
    };
    CcValidator.prototype.updateValidity = function (isValid) {
        this.ccValid = isValid;
        // Since this method is only called when a change
        // in value occurs, a simple toggle will
        this.$successEl.toggleClass('valid');
    };



    // Initialize on document ready
    $(document).ready(function() {
        var ccValidator = new CcValidator();
    });
})();