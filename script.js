// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Sidebar Toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

// Copy Code Functionality
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const targetId = button.getAttribute('data-target');
    const codeElement = document.getElementById(targetId);
    const code = codeElement.textContent;

    try {
      await navigator.clipboard.writeText(code);

      // Update button text
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      button.style.backgroundColor = 'var(--success-color)';
      button.style.color = 'white';
      button.style.borderColor = 'var(--success-color)';

      // Reset button after 2 seconds
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.backgroundColor = '';
        button.style.color = '';
        button.style.borderColor = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  });
});

// Modal
const openModalBtn = document.getElementById('openModal');
const modal = document.getElementById('modal');
const modalCloseBtns = document.querySelectorAll('.modal-close');

if (openModalBtn) {
  openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });
}

modalCloseBtns.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.remove('active');
  });
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Drawer
const openDrawerBtn = document.getElementById('openDrawer');
const drawer = document.getElementById('drawer');
const drawerCloseBtn = document.querySelector('.drawer-close');

if (openDrawerBtn) {
  openDrawerBtn.addEventListener('click', () => {
    drawer.classList.add('active');
  });
}

if (drawerCloseBtn) {
  drawerCloseBtn.addEventListener('click', () => {
    drawer.classList.remove('active');
  });
}

// Close drawer when clicking outside
drawer.addEventListener('click', (e) => {
  if (e.target === drawer) {
    drawer.classList.remove('active');
  }
});

// Dropdowns
document.querySelectorAll('.dropdown-toggle').forEach(button => {
  button.addEventListener('click', function() {
    const dropdown = this.parentElement;

    // Close all other dropdowns
    document.querySelectorAll('.dropdown').forEach(d => {
      if (d !== dropdown) {
        d.classList.remove('active');
      }
    });

    // Toggle current dropdown
    dropdown.classList.toggle('active');
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
});

// Accordion
document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', function() {
    const accordionItem = this.parentElement;
    const accordion = accordionItem.parentElement;
    const wasActive = accordionItem.classList.contains('active');

    // Close all items
    accordion.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!wasActive) {
      accordionItem.classList.add('active');
    }
  });
});

// Tabs
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', function() {
    const tabId = this.getAttribute('data-tab');
    const tabsContainer = this.closest('.tabs');

    // Remove active class from all buttons and panes
    tabsContainer.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });

    tabsContainer.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    // Add active class to clicked button and corresponding pane
    this.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Tooltips
document.querySelectorAll('.tooltip-container').forEach(element => {
  const tooltipText = element.getAttribute('data-tooltip');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = tooltipText;
  element.appendChild(tooltip);
});

// Popover
const popoverButton = document.getElementById('popoverButton');
const popover = document.getElementById('popover');

if (popoverButton && popover) {
  popoverButton.addEventListener('click', () => {
    popover.classList.toggle('active');
  });

  // Close popover when clicking outside
  document.addEventListener('click', (e) => {
    if (!popoverButton.contains(e.target) && !popover.contains(e.target)) {
      popover.classList.remove('active');
    }
  });
}

// Toast Messages
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle'
  }[type];

  toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
    `;

  toastContainer.appendChild(toast);

  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => {
    removeToast(toast);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeToast(toast);
  }, 5000);
}

function removeToast(toast) {
  toast.classList.add('hiding');
  setTimeout(() => {
    toast.remove();
  }, 300);
}

// Show toast buttons
const showToastSuccess = document.getElementById('showToastSuccess');
const showToastError = document.getElementById('showToastError');
const showToastInfo = document.getElementById('showToastInfo');
const showToastWarning = document.getElementById('showToastWarning');

if (showToastSuccess) {
  showToastSuccess.addEventListener('click', () => {
    showToast('Operation completed successfully!', 'success');
  });
}

if (showToastError) {
  showToastError.addEventListener('click', () => {
    showToast('An error occurred. Please try again.', 'error');
  });
}

if (showToastInfo) {
  showToastInfo.addEventListener('click', () => {
    showToast('Here is some useful information.', 'info');
  });
}

if (showToastWarning) {
  showToastWarning.addEventListener('click', () => {
    showToast('Please review your input.', 'warning');
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation link
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('.component-section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Initialize tooltips on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add any initialization code here
});