// @flow
import { push } from "react-router-redux";
import * as actionCreators from "./creators";
import db from "../db";
import Account from "../models/Account";
import * as transactionService from "../services/transactionService";

export const fetchAccounts = () => async dispatch => {
  dispatch(actionCreators.fetchAccountsRequested());
  try {
    const response = await db.find({
      selector: { "metadata.type": "Account" }
    });
    dispatch(
      actionCreators.fetchAccountsSucceeded(
        response.docs.map(doc => new Account(doc))
      )
    );
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Cannot fetch accounts", err)
    );
    dispatch(actionCreators.fetchAccountsFailed(err));
  }
};

export const deleteAccount = (accountId: string) => async dispatch => {
  dispatch(actionCreators.deleteAccountRequested(accountId));
  try {
    const doc = await db.get(accountId);
    await db.remove(doc);
    dispatch(actionCreators.showSuccessNotification("The account was deleted"));
    dispatch(actionCreators.deleteAccountSucceeded(accountId));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Cannot delete account", err)
    );
    dispatch(actionCreators.deleteAccountFailed(err));
  }
};

export const createAccount = (accountData: Account) => async dispatch => {
  try {
    const response = await db.post(accountData);
    dispatch(
      actionCreators.createAccountSucceeded(new Account(response.account))
    );
    dispatch(push("/accounts"));
    dispatch(actionCreators.showSuccessNotification("Account created"));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Account creation failed", err)
    );
    dispatch(actionCreators.createAccountFailed(err));
  }
};

export const fetchAccountById = (accountId: string) => async dispatch => {
  try {
    const account = await db.get(accountId);
    dispatch(actionCreators.fetchAccountByIdSucceeded(new Account(account)));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Failed to get account", err)
    );
  }
};

export const updateAccount = (
  accountId: string,
  accountData: Account
) => async dispatch => {
  try {
    let account = {
      ...(await db.get(accountId)),
      ...accountData
    };
    await db.put(account);
    account = await db.get(account._id);
    dispatch(actionCreators.updateAccountSucceeded(new Account(account)));
    dispatch(push("/accounts"));
    dispatch(actionCreators.showSuccessNotification("Account updated"));
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Account update failed", err)
    );
    dispatch(actionCreators.updateAccountFailed(err));
  }
};

export const showGlobalModal = modalConfig => dispatch => {
  dispatch(actionCreators.showGlobalModal(modalConfig));
};

export const hideGlobalModal = () => dispatch => {
  dispatch(actionCreators.hideGlobalModal());
};

export const importAccountStatement = (
  account: Account,
  statementFile: File
) => async dispatch => {
  dispatch(actionCreators.importAccountStatementRequested());
  try {
    const {
      numImported,
      numSkipped
    } = await transactionService.importAccountStatement(account, statementFile);
    dispatch(actionCreators.importAccountStatementSucceeded());
    dispatch(
      actionCreators.showSuccessNotification(
        "Statement import succeeded",
        `Imported: ${numImported}. Skipped ${numSkipped}`
      )
    );
  } catch (err) {
    dispatch(
      actionCreators.showErrorNotification("Statement import failed", err)
    );
    dispatch(actionCreators.importAccountStatementFailed(err));
  }
};
