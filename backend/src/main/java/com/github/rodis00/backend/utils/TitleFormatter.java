package com.github.rodis00.backend.utils;

public class TitleFormatter {

    public static String capitalizeFirstLetter(String title) {
        if (title == null || title.isEmpty()) {
            return title;
        }
        return title.substring(0, 1).toUpperCase() + title.substring(1).toLowerCase();
    }
}
