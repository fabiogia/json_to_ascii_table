function AsciiBox(props) {
  const NBSP = '\xa0';
  
  const initialProps = {
    blankSpace: NBSP,
    marginLeft: 1,
    marginRight: 1,
  };

  const boxSingle = {
    topLeft: '┌',
    hor: '─',
    startHSep: '┬',
    topRight: '┐',
    vert: '│',
    startVertSep: '├',
    centerSep: '┼',
    endVertSep: '┤',
    bottomLeft: '└',
    endHSep: '┴',
    bottomRight: '┘'
  };
  
  const boxDouble = {
    topLeft: '╔',
    hor: '═',
    startHSep: '╦',
    topRight: '╗',
    vert: '║',
    startVertSep: '╠',
    centerSep: '╬',
    endVertSep: '╣',
    bottomLeft: '╚',
    endHSep: '╩',
    bottomRight: '╝'
  };
  
  props = {
    ...initialProps,
    doubleBorder: props?.doubleBorder ?? false,
    blankSpace: props?.blankSpace ?? NBSP,
    marginLeft: props?.marginLeft ?? 1,
    marginRight: props?.marginRight ?? 1
  }
  
  props.marginLeftChar = props.blankSpace.repeat(props.marginLeft);
  props.marginRightChar = props.blankSpace.repeat(props.marginRight);
  
  const box = props.doubleBorder ? boxDouble : boxSingle;
  
  const getKeys = (obj) => {
    var keys = [];
    for (var key in obj) {
      keys.push(key);
    }
    return keys;
  }

  const getFields = (obj) => {
    if (!obj || !Array.isArray(obj)) return [];
    return getKeys(obj[0]);
  }
  
  this.draw = function (jsonData) {
    if (jsonData.length === 0) {
      return '';
    }
    
    var fields = getFields(jsonData);
    
    var columns = fields.map(field =>
      [field].concat(
      jsonData.map(qitem => qitem[field])
    ));
    
    var columnsWidth = columns.map(column => 
        Math.max(...column.map(item => item.length)));

    var col1 = [
      box.topLeft,
      ...Array(jsonData.length) // include field name
        .fill([box.vert, box.startVertSep]).flat(),
      box.vert,
      box.bottomLeft
    ];
    
    var colVSep = [
      box.startHSep,
      ...Array(jsonData.length) // include field name
        .fill([box.vert, box.centerSep]).flat(),
      box.vert,
      box.endHSep
    ];
    
    var colLast = [
      box.topRight,
      ...Array(jsonData.length) // include field name
        .fill([box.vert, box.endVertSep]).flat(),
      box.vert,
      box.bottomRight
    ];

    var tableCols = [
      col1
    ];
    
    const lastIndex = columns.length - 1;
    for (var c = 0; c <= lastIndex; c++) {
      const horTotalWidth = box.hor.repeat(
        props.marginLeft +
        props.marginRight +
        columnsWidth[c]);
        // "ID".padStart(5, "-")            

      var colData = [
        horTotalWidth,
        ...columns[c].map(row => [
          props.marginLeftChar
            + row.padEnd(columnsWidth[c], props.blankSpace)
            + props.marginRightChar,
          horTotalWidth
        ]).flat(),
      ];
      tableCols.push(colData);

      if (c === lastIndex)
        tableCols.push(colLast);
      else
        tableCols.push(colVSep);
    }
    
    let asciiTable = '';
    const colCount = tableCols.length;
    const rowCount = col1.length;
    for (var r = 0; r < rowCount; r++) {
      for (var c = 0; c < colCount; c++) {
        asciiTable += tableCols[c][r]
      }
      asciiTable += '\n';
    }

    return asciiTable;
  }
}

// function AsciiDoubleBox(props) {
//   return new AsciiBox({
//     ...props,
//     box: {
//       //...props?.box,
//       topLeft: '╔',
//       //hor: '═',
//       startHSep: '╦',
//       topRight: '╗',
//       vert: '║',
//       startVertSep: '╠',
//       centerSep: '╬',
//       endVertSep: '╣',
//       bottomLeft: '╚',
//       endHSep: '╩',
//       bottomRight: '╝'
//     }
//   });
// }


var query = [
    {
        "ID": "31891083-1",
        "OPERATION": "S",
        "NAME": "TEST NAME 1"
    },
    {
        "ID": "31891556-1",
        "OPERATION": "S",
        "NAME": "TEST NAME 103"
    }
];

console.log(
  (new AsciiBox({
     doubleBorder: false,
     blankSpace: '░'
  })).draw(query)
);

console.log(
  (new AsciiBox({
     doubleBorder: true
  })).draw(query)
);
