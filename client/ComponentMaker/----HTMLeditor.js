Template.HTMLeditor.onRendered(function () {
  var editor = CodeMirror.fromTextArea(
    this.find("#codemirroreditor"), {
      lineNumbers: true,
      mode: "javascript" // set any of supported language modes here
  });
  console.log(editor);
  var doc = CodeMirror.doc("test", {}, 2);
  console.log(doc);
});