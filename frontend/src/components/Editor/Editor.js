import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/edit/matchtags.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";

import { ACTIONS } from "../../actions";

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function loadEditor() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realTimeEditor"),
        {
          mode: { name: "javascript", json: true },
          lineNumbers: true,
          theme: "dracula",
          lineWrapping: true,
          autoCloseBrackets: true,
          matchBrackets: true,
          autoCloseTags: true,
          matchTags: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        },
      );

      // Listen for changes in the editor and send them to the server over Socket.io server socket connection

      editorRef.current.on("change", (instance, changes) => {
        // console.log("changes", changes);

        const { origin } = changes;

        const code = instance.getValue();
        // console.log(code);

        if (origin !== "setValue") {
          // console.log("emitting code change", code);
          socketRef.current?.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
        // console.log(code);
      });

      // Listen for changes in the editor and send them to the server over Socket.io server socket connection
    }

    loadEditor();
  }, []);

  useEffect(() => {
    // console.log("socketRef.current", socketRef.current);
    if (socketRef.current) {
      socketRef.current?.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        // console.log("emitting code change", code);
        if (code != null) {
          editorRef.current?.setValue(code);
        }
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current?.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef.current]);

  return <textarea id="realTimeEditor"></textarea>;
};

export default Editor;
