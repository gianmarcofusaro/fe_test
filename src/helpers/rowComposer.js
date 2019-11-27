export const photoshootsRowComposer = (expr, row) => {

  switch (expr) {
    case "MONDAY":
      row[1] = parseFloat(row[1] + 1);
      break;
    case "TUESDAY":
      row[2] = parseFloat(row[2] + 1);
      break;
    case "WEDNESDAY":
      row[3] = parseFloat(row[3] + 1);
      break;
    case "THURSDAY":
      row[4] = parseFloat(row[4] + 1);
      break;
    case "FRIDAY":
      row[5] = parseFloat(row[5] + 1);
      break;
    case "SATURDAY":
      row[6] = parseFloat(row[6] + 1);
      break;
    case "SUNDAY":
      row[7] = parseFloat(row[7] + 1);
      break;
    default:
      console.error("No cases founds");
  }

}