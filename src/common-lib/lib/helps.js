export const imageDomain = {
  common: ``,
};

export const slotImgFetch = ({ html = "", game_id = "1" }) => {
  // replace key list
  const replaceKeyList = [
    "W",
    "W1",
    "WW",
    "WILD",
    "F",
    "F1",
    "SF",
    "SC",
    "FREE GAME ICONS",
    "SCATTER",
    "FREE",
    "icons",
    "B",
    "SB",
    "SBS",
    "icons",
  ];
  const keySwitch = (val = "") => {
    switch (val) {
      case "WW":
      case "WILD":
        return "W";
      case "SF":
      case "SC":
      case "FREE GAME ICONS":
      case "SCATTER":
        return "F";
      case "SB":
      case "SBS":
        return "SBS";
      case "FREE":
      case "icons":
        return "icons";
      default:
        return val;
    }
  };
  const forReplace = () => {
    let updateHtml = html;
    updateHtml = updateHtml.replaceAll(
      `<figure class="table">`,
      `<figure class="table-ckeditor">`
    );
    for (let i = 0; i < replaceKeyList.length; i++) {
      const reg = new RegExp("(\\[)" + replaceKeyList[i] + "(\\])", "gi");
      updateHtml = updateHtml.replaceAll(
        reg,
        `<img src="${imageDomain.common}/${game_id}/symbolList/${keySwitch(
          replaceKeyList[i]
        )}.png" alt=""/>`
      );
    }

    return updateHtml;
  };
  return forReplace();
};
