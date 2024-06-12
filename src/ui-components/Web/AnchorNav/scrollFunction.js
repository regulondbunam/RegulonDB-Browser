import Style from "./style.module.css"

function scrollFunction(
    sections = [],
    setIdSection,
    setOnTop,
    title = "",
    setNavTitle,
    animateAnchor
  ) {
    setOnTop(document.documentElement.scrollTop < 260);
    const headerNav = document.getElementById("headerNav");
    const headerNavAnchor = document.getElementById("headerNavAnchor");
    const anchorMenu = document.getElementById("anchorMenu");
    if (
      document.body.scrollTop > 260 ||
      document.documentElement.scrollTop > 260
    ) {
      if (headerNav) {
        headerNav.className = Style.headerNavShow;
        headerNav.style.display = "flex";
        sections.forEach((section) => {
          const initSection = document.getElementById(
            "init_section_" + section.id
          );
          const endSection = document.getElementById("end_section_" + section.id);
          if (initSection && endSection) {
            const initY = initSection.getBoundingClientRect().y;
            const endY = endSection.getBoundingClientRect().y;
            const hNav = headerNav.getBoundingClientRect().height;
            if (initY <= hNav && endY >= hNav) {
              setNavTitle(
                <>
                  {title}, {section.title}
                </>
              );
              setIdSection(section.id);
              animateAnchor(section.id);
            }
          }
        });
      }
      if (headerNavAnchor) {
        headerNavAnchor.className = Style.headerSticky;
      }
      if (anchorMenu) {
        anchorMenu.className = Style.menuSticky;
      }
    } else {
      if (headerNav) {
        headerNav.style.display = "none";
      }
    }
  }