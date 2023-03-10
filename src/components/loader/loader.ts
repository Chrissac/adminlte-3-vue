import Vue from 'vue';

export default {
    name: 'hadrianLoader',
    props: {
        isLoading: {
            type: Boolean,
            required: true
        },
        // If `true`, the background of the overlay will be semi-transparent,
        // allowing the user a glimpse of whatever is behind.
        semiTransparent: {
            type: Boolean,
            default: false
        },
        // If `true`, the position of the overlay will be fixed,
        // helping when loader should be visible on a scrolled view
        fixed: {
            type: Boolean,
            default: false
        },
        // If `true`, the position of the overlay will be fixed without the left bar,
        // helping when loader should be visible on a scrolled view
        fixedFullscreen: {
            type: Boolean,
            default: false
        },
        // A message to display below the spinner.
        message: {
            type: String
        },
        spinnerClass: {
            type: String,
            default: ''
        }
    }
};
