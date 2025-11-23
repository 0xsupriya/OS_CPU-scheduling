#!/usr/bin/env node
/**
 * Sequential (Contiguous) File Allocation - Files stored in consecutive blocks
 */

function sequentialAllocation(files, diskSize) {
    const disk = new Array(diskSize).fill(null); // null means free
    const allocation = {};
    
    for (const file of files) {
        const { filename, start, numBlocks } = file;
        
        if (start >= diskSize || start < 0) {
            console.log(`Error: Invalid start block ${start} for ${filename}`);
            continue;
        }
        
        const end = start + numBlocks;
        if (end > diskSize) {
            console.log(`Error: Not enough space for ${filename}`);
            continue;
        }
        
        // check if blocks are free
        let canAllocate = true;
        for (let i = start; i < end; i++) {
            if (disk[i] !== null) {
                console.log(`Error: Block ${i} already allocated, can't allocate ${filename}`);
                canAllocate = false;
                break;
            }
        }
        
        if (canAllocate) {
            // allocate blocks
            for (let i = start; i < end; i++) {
                disk[i] = filename;
            }
            allocation[filename] = { start, numBlocks };
        }
    }
    
    return { allocation, disk };
}

function printAllocation(allocation) {
    console.log("\nSequential (Contiguous) File Allocation:");
    console.log("File".padEnd(15), "Start Block".padEnd(15), "Number of Blocks");
    console.log("-".repeat(50));
    
    for (const [filename, info] of Object.entries(allocation)) {
        console.log(
            filename.padEnd(15),
            String(info.start).padEnd(15),
            info.numBlocks
        );
    }
}

// Main execution
if (require.main === module) {
    const files = [
        { filename: "file1.txt", start: 0, numBlocks: 5 },
        { filename: "file2.txt", start: 5, numBlocks: 3 },
        { filename: "file3.txt", start: 10, numBlocks: 4 }
    ];
    const diskSize = 20;
    
    const { allocation, disk } = sequentialAllocation(files, diskSize);
    printAllocation(allocation);
    
    console.log("\nDisk Map:");
    for (let i = 0; i < diskSize; i++) {
        const status = disk[i] ? disk[i] : "Free";
        console.log(`Block ${i}: ${status}`);
    }
}

module.exports = { sequentialAllocation, printAllocation };
