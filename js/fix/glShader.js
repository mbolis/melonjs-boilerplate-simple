(function() {
  "use strict"

  function unroll(from, until, replace, template) {
    replace = new RegExp(replace, "g");
    template = template.join("\n");

    var output = [];
    for (var i = from; i < until; i++) {
      output.push(template.replace(replace, i));
    }

    return output;
  }

  me.QuadGLShader = me.GLShader.extend({
    /**
     * @ignore
     */
    init: function init(gl, maxTextures) {
      this._super(me.GLShader, "init", [ gl,
        [// vertex`
          "precision highp float;",
          "attribute vec2 aVertex;",
          "attribute vec4 aColor;",
          "attribute float aTexture;",
          "attribute vec2 aRegion;",
          "uniform mat3 uProjectionMatrix;",
          "varying vec4 vColor;",
          "varying float vTexture;",
          "varying vec2 vRegion;",
          "void main(void) {",
          "    // Transform the vertex position by the projection matrix",
          "    gl_Position = vec4((uProjectionMatrix * vec3(aVertex, 1.0)).xy, 0.0, 1.0);",
          "    // Pass the remaining attributes to the fragment shader",
          "    vColor = vec4(aColor.rgb * aColor.a, aColor.a);",
          "    vTexture = aTexture;",
          "    vRegion = aRegion;",
          "}"].join("\n"),
        [// fragment
          /*
           * Dynamically indexing arrays in a fragment shader is not allowed.
           * More so on some Linux machines, so I'm TOTALLY UNROLLING the shader!
           */
          "uniform sampler2D uSampler[" + maxTextures + "];",
          "varying vec4 vColor;",
          "varying float vTexture;",
          "varying vec2 vRegion;",
          "void main(void) {",
          "    // Convert texture unit index to integer",
          "    int texture = int(vTexture);",
          "    if (texture == 0) {",
          "        gl_FragColor = texture2D(uSampler[0], vRegion) * vColor;",
          "    }",
          "    else {"]
        .concat(unroll(1, maxTextures-1, "#i", [
          "        if (texture == #i) {",
          "            gl_FragColor = texture2D(uSampler[#i], vRegion) * vColor;",
          "            return;",
          "        }",
          "        gl_FragColor = texture2D(uSampler[" + (maxTextures - 1) + "], vRegion) * vColor;",
          "        "]))
        .concat([
          "    }",
          "}"]).join("\n")
      ]);

      return this;
    }
  });

}());
