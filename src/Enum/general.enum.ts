export enum Role{
    ADMIN = "admin",
    USER ="user"
}

export enum Gender{
    Male ="gender",
    Female ="female",
    Genderfluid ="genderfluid",
    Genderqueer= "genderqueer",
    Cisgender ="cisgender",
    Rather_not_say ="rather_not_say"
}

export enum NotificationType {
    ORDINARY_USER_CREATED = "ordinary_user_created",
    ORDINARY_USER_LOGGED_IN = "ordinary_user_logged_in",
    ORDINARY_USER_DELETED = "ordinary_user_deleted",
    ORDINARY_USER_PASSWORD_CHANGED = "ordinary_user_password_changed",
    EMAIL_VERIFICATION = "email_verification",
    BLOGPOST_CREATED = "blogpost_created",
    BLOGPOST_EDITED = "blogpost_edited",
    BLOGPOST_DELETED = "blogpost_deleted",
    ADMIN_CREATED = "admin_created",
    ADMIN_PASSWORD_CHANGED = "admin_password_changed",
    LOGGED_IN="logged_in"
}
