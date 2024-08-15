function renderHeader() {
    document.getElementsByTagName('header')[0].innerHTML = /*html*/`
        <section class="sideBar">
        <img class="sideBarLogo" src="../assets/icons/logoWhite.png">
        <div class="sideBarMenu">
            <a href="../htmls/summary.html"><img class="sideBarPic" src="../assets/icons/summary.png">Summary</a>
            <a href="../htmls/addTask.html"><img class="sideBarPic" src="../assets/icons/addTask.png">Add Task</a>
            <a href="../htmls/board.html"><img class="sideBarPic" src="../assets/icons/board.png">Board</a>
            <a href="../htmls/contacts.html"><img class="sideBarPic" src="../assets/icons/contacts.png">Contacts</a>
        </div>
        <div class="sideBarLegal">
            <a class="sideBarLegalLink" href="../htmls/privacyPolicy.html">Privacy Policy</a>
            <a class="sideBarLegalLink" href="../htmls/legalNotice.html">Legal Notice</a>
        </div>
    </section>

    <div class="header">
        <div class="headerDiv"></div>
        <div class="headerBtns">
            <p class="headerText">Kanban Project Management Tool</p>
            <div class="headerBtns">
                <a href="../htmls/help.html"><img class="headerHelpBtn" src="../assets/icons/help.png"></a>
                <a href="../htmls/summary.html" id="headerProfile"><div>SM</div></a>
            </div>
        </div>
        <div class="seperator"></div>

    </div>
    `
}