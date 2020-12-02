$(document).ready(function() {
    $('#popularSearch').hide();
    $('#searchContainer').hide();
    $('#searchResult').hide();
    
    $('#searchField').focusin(function() {
        $('#popularSearch').show();
        $('#searchContainer').show();
        
        
    });
    $('#searchField').focusout(function() {
        $('#popularSearch').hide();
        $('#searchContainer').hide();
    });
    
    
});