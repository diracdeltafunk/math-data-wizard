function listSyntax(lang) {
    switch (lang) {
        case "sage":
            return { l_bracket: "[", r_bracket: "]", delimiter: "," };
            break;
        case "mathematica":
            return { l_bracket: "{", r_bracket: "}", delimiter: "," };
            break;
        case "gap":
            return {l_bracket: "[", r_bracket: "]", delimiter: "," };
            break;
        case "macaulay2":
            return { l_bracket: "{", r_bracket: "}", delimiter: "," };
        case "maple":
            return {l_bracket: "[", r_bracket: "]", delimiter: "," };
    }
    console.error("Language " + lang + " not recognized!");
}

function convertList(str, source_lang, target_lang) {
    let syntax_in = listSyntax(source_lang);
    let syntax_out = listSyntax(target_lang);
    return str.replace(/\s/g, "").replaceAll(syntax_in.l_bracket, syntax_out.l_bracket).replaceAll(syntax_in.r_bracket, syntax_out.r_bracket).replaceAll(syntax_in.delimiter, syntax_out.delimiter);
}

function copyOutputToClipboard() {
    navigator.clipboard.writeText($('#output').val());
}

function swap() {
    let temp_in = $('#input').val();
    let temp_source = $('#source').val();
    let temp_out = $('#output').val();
    let temp_target = $('#target').val();
    $('#input').val(temp_out);
    $('#output').val(temp_in);
    $('#source').val(temp_target);
    $('#target').val(temp_source);
}

$(function () {
    $('#copy').on("click", copyOutputToClipboard);
    $('#convert').on("click", function () {
        let input = $('#input').val();
        let source = $('#source').val();
        let target = $('#target').val();

        if ($('#type').val() == "list") {
            $('#output').val(convertList(input, source, target));
        }
    });
    $('#swap').on("click", swap);
});