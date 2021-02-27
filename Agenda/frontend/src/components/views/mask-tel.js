import $ from 'jquery';

export default function mask(sel) {
    $(document).ready(function() {
        $(sel).mask('(99) 99999-9999');
    });
}