// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract IPFSUploader {
    event NewDataUploaded(bytes32 indexed ipfsHash);

    function uploadNewData(bytes32 ipfsHash) external {
        emit NewDataUploaded(ipfsHash);
    }
}
