function openTab(evt, tab) {
  const tabcontent = document.getElementsByClassName("content__inner");
  const tablinks = document.getElementsByClassName("tab");

  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tab).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Horizontal scroll for tabs
if (window.innerWidth > 800) {
  const scrollContainer = document.querySelector(".tabs");

  scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
  });
}
