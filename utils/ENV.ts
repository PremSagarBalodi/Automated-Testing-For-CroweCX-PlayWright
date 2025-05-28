export default class ENV {
    public static authenticationURL = process.env.authenticationURL || "";
    public static authenticationUsername = process.env.authenticationUsername || "";
    public static authenticationPassword = process.env.authenticationPassword || "";
    public static applicationURL = process.env.applicationURL || "";
    public static webapiURL = process.env.webapiURL || "";

}