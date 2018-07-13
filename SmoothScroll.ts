/**
 * Recursively updates a container's scroll position until it reaches a specified final position.
 * SmoothScroll avoids Jquery animations and instead uses the native requestAnimationFrame function
 * to avoid any issues between Jquery's scroll animation and Angular's lifecycles. 
 */
export default class SmoothScroll {

    /**
     * Initiate scroll
     * @param scrollContainer A scrollable jquery element (e.g. $('body') to scroll entire page)
     * @param scrollSize How far to scroll each frame (in px, around 30 results in a medium-fast scroll)
     * @param finalPos Final scroll position (in px)
     */
    public static start(scrollContainer, scrollSize: number, finalPos: number): void {
        let currScrollLocation = scrollContainer.scrollTop();
        // Break out of scroll after reaching the selected element's position.
        // Since scroll and scrollTop are floating point, there's some rounding errors. 
        // Round difference between desired scroll position and scroll position to prevent infinite looping. 
        if (Math.abs(currScrollLocation - finalPos) < 1) {
            return;
        };

        let newScrollLocation: number;

        // Determine how far to scroll.
        // Scroll down (increase scrollTop) by scrollSize if selected element is below the container's scroll position,
        // otherwise scroll up. Scroll by scrollSize, until the difference between the scroll location and the element's
        // position is <scrollSize; then just jump to the element
        if (finalPos > currScrollLocation) {
            newScrollLocation = Math.abs(finalPos - currScrollLocation) < scrollSize ? finalPos : currScrollLocation + scrollSize;
        } else {
            newScrollLocation = Math.abs(finalPos - currScrollLocation) < scrollSize ? finalPos : currScrollLocation - scrollSize;
        } 

        // repeat every time an animation frame is available
        requestAnimationFrame(() => {
            scrollContainer.scrollTop(newScrollLocation);
            this.start(scrollContainer, scrollSize, finalPos);
        });
    }
}