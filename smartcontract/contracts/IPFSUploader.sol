// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UploadAndRequestIPFS {
    struct UploadMetadata {
        address dataOwner;
        uint uploadedAt;
        address[] authorisedUsers;
        uint sellPrice;
        bytes32 ipfsHash;
    }

    mapping(bytes32 => UploadMetadata) public uploads;

    function upload(
        bytes32 ipfsHash,
        address[] memory authorisedUsers,
        uint sellPrice
    ) external returns (UploadMetadata memory newUpload) {
        newUpload.uploadedAt = block.timestamp;
        newUpload.authorisedUsers = authorisedUsers;
        newUpload.ipfsHash = ipfsHash;
        newUpload.dataOwner = msg.sender;
        newUpload.sellPrice = sellPrice;
        uploads[ipfsHash] = newUpload;
        return newUpload;
    }
}
