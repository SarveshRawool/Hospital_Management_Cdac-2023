package com.app.service;

import com.app.pojos.Reciept;

public interface RecieptService {

	Reciept getRecieptById(Long id);

	Reciept setReciept(Long id, Reciept reciept);

}
