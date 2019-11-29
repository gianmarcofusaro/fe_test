export const photoshootsRowFiller = (expr, row) => {

  switch (expr) {
    case "MONDAY":
      row[1] = row[1] + 1;
      break;
    case "TUESDAY":
      row[2] = row[2] + 1;
      break;
    case "WEDNESDAY":
      row[3] = row[3] + 1;
      break;
    case "THURSDAY":
      row[4] = row[4] + 1;
      break;
    case "FRIDAY":
      row[5] = row[5] + 1;
      break;
    case "SATURDAY":
      row[6] = row[6] + 1;
      break;
    case "SUNDAY":
      row[7] = row[7] + 1;
      break;
    default:
      console.error("No cases founds");
  }
}