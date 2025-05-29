'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  let hasActiveItems = false;

  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
      hasActiveItems = true;
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
      hasActiveItems = true;
    } else {
      filterItems[i].classList.remove("active");
    }
  }

  // Show "No projects found" message if no items are active
  const noProjectsMessage = document.querySelector(".no-projects-message");
  if (!hasActiveItems) {
    if (!noProjectsMessage) {
      const message = document.createElement("p");
      message.className = "no-projects-message";
      message.style.textAlign = "center";
      message.style.color = "var(--light-gray)";
      message.style.marginTop = "2rem";
      message.innerText = "No projects found in this category";
      document.querySelector(".project-list").appendChild(message);
    }
  } else if (noProjectsMessage) {
    noProjectsMessage.remove();
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Add return button functionality for project links
const projectLinks = document.querySelectorAll(".project-item a");
projectLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    if (!this.getAttribute("target")) {
      e.preventDefault();
      const currentPage = document.querySelector(".active[data-page]");
      const projectPage = this.getAttribute("href");
      
      // Store the current page in session storage
      sessionStorage.setItem("previousPage", currentPage.dataset.page);
      
      // Navigate to the project
      window.location.href = projectPage;
    }
  });
});

// Add return button if we came from portfolio page
if (sessionStorage.getItem("previousPage")) {
  const returnBtn = document.createElement("button");
  returnBtn.className = "return-btn";
  returnBtn.innerHTML = '<ion-icon name="arrow-back-outline"></ion-icon> Return to Portfolio';
  returnBtn.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    background: var(--eerie-black-2);
    color: var(--orange-yellow-crayola);
    padding: 10px 20px;
    border-radius: 14px;
    border: 1px solid var(--jet);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 1000;
    transition: var(--transition-1);
  `;
  
  returnBtn.addEventListener("mouseover", function() {
    this.style.background = "var(--jet)";
  });
  
  returnBtn.addEventListener("mouseout", function() {
    this.style.background = "var(--eerie-black-2)";
  });
  
  returnBtn.addEventListener("click", function() {
    const previousPage = sessionStorage.getItem("previousPage");
    sessionStorage.removeItem("previousPage");
    window.location.href = "index.html#" + previousPage;
  });
  
  document.body.appendChild(returnBtn);
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Handle URL hash changes for direct navigation
function handleHashChange() {
  const hash = window.location.hash.slice(1) || 'about'; // default to about if no hash
  const targetPage = document.querySelector(`[data-page="${hash}"]`);
  const targetNav = document.querySelector(`[data-nav-link="${hash}"]`);
  
  if (targetPage && targetNav) {
    // Remove active class from all pages and nav items
    pages.forEach(page => page.classList.remove('active'));
    navigationLinks.forEach(nav => nav.classList.remove('active'));
    
    // Add active class to target page and nav item
    targetPage.classList.add('active');
    targetNav.classList.add('active');
    window.scrollTo(0, 0);
  }
}

// Listen for hash changes
window.addEventListener('hashchange', handleHashChange);

// Initial load
handleHashChange();

// Project Modal Functionality
const projectData = {
  'powerbi-sales': {
    title: 'Sales Analytics Dashboard',
    subtitle: 'Interactive Power BI Dashboard',
    image: 'https://powerbi.microsoft.com/pictures/shared/social/social-default-image.png',
    details: 'Comprehensive sales analytics dashboard providing real-time insights into business performance, trends, and KPIs.',
    technologies: ['Power BI', 'DAX', 'SQL', 'Data Modeling'],
    highlights: [
      'Real-time sales tracking and analytics',
      'Interactive drill-down capabilities',
      'Custom DAX measures for advanced metrics',
      'Automated data refresh and reporting'
    ],
    link: './assets/images/powerbi(Real-Dash).png'
  },
  'diversity': {
    title: 'Diversity & Inclusion Analytics',
    subtitle: 'HR Analytics Dashboard',
    image: 'https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-analytics-pane/analytics-pane-17.png',
    details: 'HR analytics solution focused on tracking and improving workplace diversity and inclusion metrics.',
    technologies: ['Power BI', 'Excel', 'Statistical Analysis', 'HR Metrics'],
    highlights: [
      'Demographic trend analysis',
      'Inclusion initiative tracking',
      'Pay equity analysis',
      'Recruitment funnel diversity metrics'
    ],
    link: 'diversity-inclusion.html'
  },
  'retention': {
    title: 'Customer Retention Analysis',
    subtitle: 'Customer Analytics Dashboard',
    image: 'https://community.powerbi.com/t5/image/serverpage/image-id/223089i422C78072FEF6F4F/image-size/large',
    details: 'Advanced customer lifecycle and retention analysis dashboard with predictive churn modeling.',
    technologies: ['Power BI', 'Python', 'Machine Learning', 'SQL'],
    highlights: [
      'Cohort analysis',
      'Churn prediction modeling',
      'Customer segmentation',
      'Retention strategy recommendations'
    ],
    link: 'customer-retention.html'
  },
  'tableau-retail': {
    title: 'Retail Analytics Dashboard',
    subtitle: 'Tableau Visualization',
    image: 'https://help.tableau.com/current/pro/desktop/en-us/Resources/Images/Viz_Types_Overview.png',
    details: 'Comprehensive retail performance analysis dashboard with advanced Tableau features.',
    technologies: ['Tableau', 'SQL', 'Excel', 'Statistical Analysis'],
    highlights: [
      'Sales trend analysis',
      'Inventory optimization',
      'Geographic performance mapping',
      'Product category insights'
    ],
    link: './assets/images/Tableau_Dash.png'
  },
  'sql-excel': {
    title: 'Data Querying & Reporting',
    subtitle: 'SQL, Excel & Access Analytics',
    image: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    details: 'Comprehensive data analysis solution using SQL queries, Excel advanced features, and Access databases for business intelligence and reporting.',
    technologies: ['SQL', 'Excel', 'Access', 'VBA', 'Power Query'],
    highlights: [
      'Complex SQL queries and database management',
      'Advanced Excel formulas and pivot tables',
      'Automated reporting with VBA macros',
      'Data cleaning and transformation pipelines',
      'Interactive dashboards and visualizations'
    ],
    link: 'data-querying-reporting.html'
  }
};

// Get modal elements
const projectModal = document.getElementById('project-modal');
const projectModalTitle = document.getElementById('modal-title');
const projectModalSubtitle = document.getElementById('modal-subtitle');
const projectModalImage = document.getElementById('modal-image');
const projectModalDetails = document.getElementById('modal-details');
const projectModalTechList = document.getElementById('modal-tech-list');
const projectModalHighlights = document.getElementById('modal-highlights');
const projectModalLink = document.getElementById('modal-link');

// Open modal function
function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  projectModalTitle.textContent = project.title;
  projectModalSubtitle.textContent = project.subtitle;
  projectModalImage.src = project.image;
  projectModalDetails.textContent = project.details;
  
  // Set technologies
  projectModalTechList.innerHTML = project.technologies
    .map(tech => `<li>${tech}</li>`)
    .join('');
  
  // Set highlights
  projectModalHighlights.innerHTML = project.highlights
    .map(highlight => `<li>${highlight}</li>`)
    .join('');
  
  projectModalLink.href = project.link;
  
  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal function
function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Add click listeners to project triggers
document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const projectId = trigger.getAttribute('data-modal-trigger');
    openProjectModal(projectId);
  });
});

// Close modal when clicking close button or outside
document.querySelector('.modal-close').addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) closeProjectModal();
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.querySelector('.form-alert');

  if (!contactForm) {
    console.error('Contact form not found!');
    return;
  }

  function showFormAlert(message, isError = false) {
    if (formAlert) {
      formAlert.textContent = message;
      formAlert.style.display = 'block';
      formAlert.style.color = isError ? 'var(--bittersweet-shimmer)' : 'var(--vegas-gold)';
      setTimeout(() => {
        formAlert.style.display = 'none';
      }, 5000);
    }
  }

  // Initialize EmailJS with your public key
  (function() {
    emailjs.init("1yHztREs84hRu6tYx");
  })();

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Get form data for logging
    const formData = {
      from_name: this.querySelector('input[name="from_name"]').value,
      reply_to: this.querySelector('input[name="reply_to"]').value,
      message: this.querySelector('textarea[name="message"]').value
    };
    
    console.log('Attempting to send email with data:', formData);
    console.log('Using Service ID: service_0g7m5dv');
    console.log('Using Template ID: template_ek6ail3');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    // Send email using form data
    emailjs.send(
      'service_iwc6t76',      // Your Service ID
      'template_ek6ail3',     // Your Template ID
      formData
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      showFormAlert('Message sent successfully! I will get back to you soon.');
      this.reset(); // Clear form
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      showFormAlert('Failed to send message: ' + (error.text || 'Unknown error'), true);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  });
});