<?php

require_once("$CFG->libdir/externallib.php");

class block_react extends block_base {
    public function init() {
        global $DB, $OUTPUT, $USER;

        $service = $DB->get_record('external_services', array('shortname' => "moodle_mobile_app", 'enabled' => 1));
        $token = external_generate_token_for_current_user($service);

        $this->title = "React.JS";
        $this->content = new \stdClass();
        $this->content->text = $OUTPUT->render_from_template("block_react/content", array(
            "token" => $token->token,
        ));
    }
}