'use strict';
import {ethers} from "ethers";
import {address, abi} from "../abi/STRP.json";
import { HttpEventRequest, HttpResponse, HttpResponseBody } from './types';


const STRP_DECIMALS = 18;

export async function circulatingSupply(event: HttpEventRequest<{ city: string }>): HttpResponse {
  let maxSupply = ethers.utils.parseUnits("100000000", STRP_DECIMALS);

  let provider = new ethers.providers.JsonRpcProvider(process.env["RPC_PROVIDER"]);

  let contract = new ethers.Contract(address, abi, provider);

  let daoBalance = await contract.balanceOf(process.env["DAO_ADDR"]);
  let treasuryBalance = await contract.balanceOf(process.env["TREASURY_ADDR"]);

  let circSupply = maxSupply.sub(daoBalance).sub(treasuryBalance);
  let formated = ethers.utils.formatUnits(circSupply, STRP_DECIMALS);

  return {
    statusCode: 200,
    body: formated.toString()
  };
};