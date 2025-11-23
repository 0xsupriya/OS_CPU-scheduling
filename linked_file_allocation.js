#!/usr/bin/env node
/**
 * Linked File Allocation - Each block points to the next block
 */

function linkedAllocation(files, diskSize) {
    const disk = new Array(diskSize).fill(-1); // -1 means free
    const allocation = {};
    
    for (const file of files) {
        const { filename, start, numBlocks } = file;
        
        if (start >= diskSize || start < 0) {
            console.log(`Error: Invalid start block ${start} for ${filename}`);
            continue;
        }
        
        // check if start block is free
        if (disk[start] !== -1) {
            console.log(`Error: Block ${start} already allocated for ${filename}`);
            continue;
        }
        
        // allocate blocks
        const blocks = [start];
        let current = start;
        
        for (let i = 1; i < numBlocks; i++) {
            // find next free block
            let nextBlock = null;
            for (let j = 0; j < diskSize; j++) {
                if (disk[j] === -1 && !blocks.includes(j)) {
                    nextBlock = j;
                    break;
                }
            }
            
            if (nextBlock === null) {
                console.log(`Error: Not enough free blocks for ${filename}`);
                break;
            }
            
            disk[current] = nextBlock;
            blocks.push(nextBlock);
            current = nextBlock;
        }
        
        disk[current] = -2; // -2 means end of file
        allocation[filename] = blocks;
    }
    
    return { allocation, disk };
}

function printAllocation(allocation) {
    console.log("\nLinked File Allocation:");
    console.log("File".padEnd(15), "Blocks");
    console.log("-".repeat(40));
    
    for (const [filename, blocks] of Object.entries(allocation)) {
        const blocksStr = blocks.join(" -> ");
        console.log(filename.padEnd(15), blocksStr);
    }
}

// Main execution
if (require.main === module) {
    const files = [
        { filename: "file1.txt", start: 0, numBlocks: 3 },
        { filename: "file2.txt", start: 5, numBlocks: 4 },
        { filename: "file3.txt", start: 10, numBlocks: 2 }
    ];
    const diskSize = 20;
    
    const { allocation, disk } = linkedAllocation(files, diskSize);
    printAllocation(allocation);
    
    console.log("\nDisk Status (showing links):");
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] !== -1) {
            const status = disk[i] === -2 ? "End" : `-> ${disk[i]}`;
            console.log(`Block ${i}: ${status}`);
        }
    }
}

module.exports = { linkedAllocation, printAllocation };
