<template>
  <section>
    <div class="page-title">
      <h2>Contact</h2>
    </div>

    <div class="section-content">

      <div class="row">
        <!-- Contact Info -->
        <div class="col-xs-12 col-sm-4">
          <div class="lm-info-block gray-default">
            <i class="lnr lnr-map-marker"></i>
            <h4>San Francisco</h4>
            <span class="lm-info-block-value"></span>
            <span class="lm-info-block-text"></span>
          </div>

          <div class="lm-info-block gray-default">
            <i class="lnr lnr-phone-handset"></i>
            <h4>415-832-2000</h4>
            <span class="lm-info-block-value"></span>
            <span class="lm-info-block-text"></span>
          </div>

          <div class="lm-info-block gray-default">
            <i class="lnr lnr-envelope"></i>
            <h4>alex@example.com</h4>
            <span class="lm-info-block-value"></span>
            <span class="lm-info-block-text"></span>
          </div>

          <div class="lm-info-block gray-default">
            <i class="lnr lnr-checkmark-circle"></i>
            <h4>Freelance Available</h4>
            <span class="lm-info-block-value"></span>
            <span class="lm-info-block-text"></span>
          </div>


        </div>
        <!-- End of Contact Info -->

        <!-- Contact Form -->
        <div class="col-xs-12 col-sm-8">
          <div id="map" class="map"></div>
          <div class="block-title">
            <h3>How Can I <span>Help You?</span></h3>
          </div>

          <form id="contact_form" class="contact-form" action="contact_form/contact_form.php" method="post">

            <div class="messages"></div>

            <div class="controls two-columns">
              <div class="fields clearfix">
                <div class="left-column">
                  <div class="form-group form-group-with-icon">
                    <input id="form_name" type="text" name="name" class="form-control" placeholder="" required="required" data-error="Name is required.">
                    <label>Full Name</label>
                    <div class="form-control-border"></div>
                    <div class="help-block with-errors"></div>
                  </div>

                  <div class="form-group form-group-with-icon">
                    <input id="form_email" type="email" name="email" class="form-control" placeholder="" required="required" data-error="Valid email is required.">
                    <label>Email Address</label>
                    <div class="form-control-border"></div>
                    <div class="help-block with-errors"></div>
                  </div>

                  <div class="form-group form-group-with-icon">
                    <input id="form_subject" type="text" name="subject" class="form-control" placeholder="" required="required" data-error="Subject is required.">
                    <label>Subject</label>
                    <div class="form-control-border"></div>
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="right-column">
                  <div class="form-group form-group-with-icon">
                    <textarea id="form_message" name="message" class="form-control" placeholder="" rows="7" required="required" data-error="Please, leave me a message."></textarea>
                    <label>Message</label>
                    <div class="form-control-border"></div>
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
              </div>

              <div class="g-recaptcha" data-sitekey="6LdqmCAUAAAAAMMNEZvn6g4W5e0or2sZmAVpxVqI" data-theme="dark"></div>

              <input type="submit" class="button btn-send" value="Send message">
            </div>
          </form>
        </div>
        <!-- End of Contact Form -->
      </div>

    </div>
  </section>
</template>
<style lang="scss" scoped>
.controls.two-columns .left-column {
  width: 47%;
  float: left;
  margin-right: 3%;
}

.controls.two-columns .right-column {
  width: 50%;
  float: right;
}

.g-recaptcha {
  margin-bottom: 20px;
}

/* --- Info Block with Borders --- */
.lm-info-block {
  position: relative;
  text-align: center;
  width: 100%;
  display: block;
  margin: 0 0 15px 0;
  background-color: #333;
  padding: 20px 10px;
  border: 1px solid #444;
  box-shadow: none;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.lm-info-block i {
  position: relative;
  font-size: 33px;
  color: $color-greenMunsell;
  z-index: 1;
}

.lm-info-block h4 {
  font-size: 15px;
  margin-top: 8px;
}

.lm-info-block .lm-info-block-value {
  font-size: 30px;
  line-height: 30px;
  font-weight: 400;
  display: block;
  margin: 10px 0;
  color: $color-greenMunsell;
}

.lm-info-block .lm-info-block-value:empty {
  margin: 0;
}
/* --- End of Info Block with Borders --- */

.map {
  width: 100%;
  height: 140px;
  margin: 0 0 35px;
}

@media only screen and (max-width: 480px) {
  .controls.two-columns .right-column,
  .controls.two-columns .left-column {
    float: none;
    margin: 0;
    width: 100%;
  }
}
</style>