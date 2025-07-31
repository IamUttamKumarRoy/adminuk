document.addEventListener('DOMContentLoaded', () => {
    // Select all menu items that have a submenu
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');

    hasSubmenuItems.forEach(item => {
        // Find the clickable link within this menu item
        const link = item.querySelector('a');

        // Find the submenu directly associated with this item
        const subMenu = item.querySelector('.sub-menu');

        // If there's no link or no submenu, skip this item
        if (!link || !subMenu) {
            return;
        }

        // Add a click event listener to the link
        link.addEventListener('click', (event) => {
            // Prevent the default link behavior (navigating to #)
            event.preventDefault();

            // Toggle the 'active' class on the parent 'li'
            item.classList.toggle('active');

            // Toggle the 'open' class on the submenu for CSS transition
            subMenu.classList.toggle('open');

            // Close other open submenus at the same level (optional but good for UX)
            // Get the parent ul of the current li (either main-menu or a sub-menu)
            const parentUl = item.closest('ul');
            if (parentUl) {
                // Find all other has-submenu items at the same level
                const siblingHasSubmenuItems = parentUl.querySelectorAll('.has-submenu');

                siblingHasSubmenuItems.forEach(siblingItem => {
                    // If it's not the current item, and it's active
                    if (siblingItem !== item && siblingItem.classList.contains('active')) {
                        siblingItem.classList.remove('active');
                        const siblingSubMenu = siblingItem.querySelector('.sub-menu');
                        if (siblingSubMenu) {
                            siblingSubMenu.classList.remove('open');
                        }
                    }
                });
            }
        });
    });
});